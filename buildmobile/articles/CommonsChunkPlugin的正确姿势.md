原文：[webpack bits: Getting the most out of the CommonsChunkPlugin()](https://medium.com/webpack/webpack-bits-getting-the-most-out-of-the-commonschunkplugin-ab389e5f318)

---

webpack核心团队不时喜欢参与社区在Twitter中的讨论，并以[有趣和翔实的方式分享一些知识](https://twitter.com/TheLarkInn/status/842817690951733248)。

![](http://onvaoy58z.bkt.clouddn.com/ccpt1.JPG)



这一次，“游戏规则”很简单。 安装webpack-bundle-analyzer，生成所有bundles的炫彩图片，并与我分享。 作为回报，webpack团队会对我们发现的任何潜在问题提供帮助！

## 我们发现了什么？

最常见的问题是代码重复：库，组件，代码在多个*bundle*[同步或异步]中重复出现！

## 实例一

### 许多具有重复代码的vendor bundles

![](http://onvaoy58z.bkt.clouddn.com/ccpt2.JPG)

[Swizec Teller](https://medium.com/@swizec) 分享了他的一个项目，这个项目是由8-9个单页面应用程序组成的。我选择了这个项目作为例子，是因为我们可通过它了解许多技术的运用。所以让我们来看的更仔细一些：

![](http://onvaoy58z.bkt.clouddn.com/ccp0.png)



我们可以从这里推断出不少东西（不需要看实际配置）。

每一个单页应用程序使用了一个新的CommonsChunkPlugin ，它只针对入口文件以及*vendor*代码。这将创建一个只包含来自node_modules文件夹的模块的*bundle*，另外一个*bundle*只包含应用程序代码。 配置部分：

![](http://onvaoy58z.bkt.clouddn.com/ccpt3.JPG)

```javascript
Object.keys(activeApps)
  .map(app => new webpack.optimize.CommonsChunkPlugin({
    name: `${app}_vendor`,
    chunks: [app],
    minChunks: isVendor
  }))
```

`activeApps`变量代表每个单独的入口项目(entry point)。

### 机会领域

以下是我圈出的一些可以改进的区域。

![](http://onvaoy58z.bkt.clouddn.com/ccp1.png)

### “Meta”缓存

我们上面看到的是许多大型库，例如在6个或更多的 *vendor bundle*中使用到的momentjs，lodash和jquery。 单独打包第三方库（将所有 *vendor*添加到单独的 *bundle* 中）的策略是好的，但是我们也应该在所有的 *vendor bundle*中应用相同的策略。

我建议[Swizec](https://medium.com/@swizec)在他的插件数组的末尾添加以下内容：

```javascript
new webpack.optimize.CommonsChunkPlugin({
  children: true, 
  minChunks: 6
})
```

通过这行代码，我们告诉webpack :

> 嗨 webpack，查看所有的 *chunks*（包括生成的 vendor），并将任何包含在至少6个chunks 的模块移动到一个单独的文件中。

![](http://onvaoy58z.bkt.clouddn.com/ccpt4.JPG)

![](http://onvaoy58z.bkt.clouddn.com/ccpt5.JPG)

正如你看到的，所有这些模块都被提取到一个单独的文件中，除此之外，[Swizec](https://medium.com/@swizec)报告说，这使整个应用程序的大小减少了17％！

## 实例二

### Case Two: Duplicate vendors across async chunks:

![](http://onvaoy58z.bkt.clouddn.com/ccpt6.JPG)

在这个例子中，模块数量的重复对于整体代码大小的影响并没有那么严重，然而，当你观察下面的大图时，可以看到每个异步块中都存在完全相同的3个模块。

![](http://onvaoy58z.bkt.clouddn.com/ccp2.jpeg)



如同你所看到的，同样的两三个模块在40-50个异步*bundle*中都出现了。我们应该怎么利用`CommonsChunkPlugin`解决它呢？

### 创建一个异步公共chunk

和第一个例子中用到的技术非常相似，然而，我们需要在配置选项中将`async`属性设置为`true`:

```javascript
new webpack.optimize.CommonsChunkPlugin({
  async: true, 
  children: true, 
  filename: "commonlazy.js"
});
```

同样的，webpack会扫描所有的*chunk*并寻找公共模块，由于指定了`async: true`，只会扫描通过code split分割的*bundle*。由于我们没有指定`minChunks `，所以会采用默认值3。通过这段代码，我们告诉webpack：

> 嘿webpack，查看所有的*chunks*，如果你发现同一个模块出现在3个或更多的*chunks*，将其分离成一个单独的异步公共*chunk*。

优化后的结果如下：

![](http://onvaoy58z.bkt.clouddn.com/ccpt8.JPG)

现在异步*chunks*的体积变得非常小，所有代码已经被打包成一个名为commonlazy.js的文件。 由于这些*bundle* 已经很小，直到第二次访问之后，尺寸的影响才不是很明显。 现在，每个代码分割*bundle*的数据量远远少于数据量，我们通过将这些通用模块放入单独的可高速缓存的*chunk*中来节省用户加载时间和数据的消耗。



## 更多配置项

### minChunks

那么如果你想要更多的设置项呢？ 有些情况下，你不希望有一个公共的*bundle*，因为不是每个*chunk*都可以使用它。 minChunks属性也有一个功能！ 你可以在这里设置什么模块添加到新创建的*bundle*中。 以下是一个例子

```javascript
new webpack.optimize.CommonsChunkPlugin({
  filename: "lodash-moment-shared-bundle.js", 
  minChunks: function(module, count) { 
    return module.resource && /lodash|moment/.test(module.resource) && count >= 3
  }
})
```

这段代码的意思是：

> 嘿 webpack , 当你遇到绝对路径匹配lodash或momentjs的模块，并包含在至少3个单独的*chunks*中时，将这些模块提取到单独的*chunk*中。

你也可以在这里设置 `async: true` 使其变为异步*bundle*

### 更进一步

通过`minChunks`，您可以为特定*bundles*和*entries*创建较小的可缓存的*vendors*。 最后，你的项目可能会看起来像这样：

```javascript
function lodashMomentModuleFilter(module, count) {
  return module.resource && /lodash|moment/.test(module.resource) && count >= 2;
}
function immutableReactModuleFilter(module, count) {
  return module.resource && /immutable|react/.test(module.resource) && count >=4
}
new webpack.optimize.CommonsChunkPlugin({
  filename: "lodash-moment-shared-bundle.js", 
  minChunks: lodashMomentModuleFilter
})
new webpack.optimize.CommonsChunkPlugin({
  filename: "immutable-react-shared-bundle.js", 
  minChunks: immutableReactModuleFilter
})
```

> **(4月1日更新):你可以在使用`minChunks`的同时使用`filename` ，但我们在webpack 2.3.2+ 后取消了这个用法**

## 更多例子

这里介绍了运用 `CommonsChunkPlugin()`时的一些配置项，更多例子可以查看wbpack/webpack core的GitHub repo中的 `/examples`[库](https://github.com/webpack/webpack/tree/master/examples)。如果你有更好的想法，请随时提交一个[Pull Request](https://github.com/webpack/webpack/blob/master/CONTRIBUTING.md)!