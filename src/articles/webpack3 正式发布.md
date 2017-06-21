---
typora-copy-images-to: 七牛图床
---

# 🍾🚀webpack3 正式发布🚀🍾

终于走到这里，太美了。

## 范围提升，“魔法注释”，以及更多新特性！

原文：[https://medium.com/webpack/webpack-3-official-release-15fd2dd8f07b](http://link.zhihu.com/?target=https%3A//medium.com/webpack/webpack-3-official-release-15fd2dd8f07b)

在我们发布了webpack v2之后，我们曾向社区做了一些承诺。 我们承诺，我们将提供用户投票的功能。 此外，我们承诺我们的发布周期会**更快，更稳定**。

这次没有betas版本，完全向下兼容。我们承诺让你们——让webpack成长的社区——更轻松的使用。

webpack团队自豪地宣布，今天我们已经发布了webpack 3.0.0！ 现在就可以下载或升级！

```powershell
npm install webpack@3.0.0 --save-dev
```

或者

```powershell
yarn add webpack@3.0.0 --dev
```

从webpack2 迁移到3，只需要执行升级命令，在使用上没有任何差别。我们将此标记为重大升级是因为内部的突破性变化可能会影响某些插件的使用。

**到目前为止，98%的升级的用户都没有遇到任何不兼容！**

## 有哪些新特性?

像上文提到的一样，我们发布了一些由[用户投票](https://webpack.js.org/vote)选出的功能，感谢Github，赞助商和我们的支持者，有了他们我们才能做出每一个改进。😍

#### 🔬作用域提升（Scope Hoisting）🔬

范围提升是webpack 3的旗舰功能。在打包时，Webpack将您的捆绑包中的每个模块都将被包装在单独的函数闭包(function closure) 中。这些闭包会使您的JavaScript在浏览器中执行速度更慢。相比之下，像 Closure Compiler 和 RollupJS ‘hoist’ 这样的工具可以将所有模块包装在一个大的闭包内，从而使您的代码在浏览器中具有更快的执行速度。

![1497929168082](http://onvaoy58z.bkt.clouddn.com/1497929168082.png)

而现在，使用webpack 3，您现在可以**在配置中添加下面的插件以启用范围提升**：

```javascript
module.exports = {  
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};
```

范围提升是基于ECMAScript Module语法实现的一个特征。通过这个，webpack可以根据你正在使用什么样的模块和[一些其他条件](https://medium.com/webpack/webpack-freelancing-log-book-week-5-7-4764be3266f5)来回退到正常的捆绑。

为了了解什么触发了这些回退，我们添加了一个`--display-optimization-bailout` cli标志，它将告诉你是什么导致的回退。

![1497929229855](http://onvaoy58z.bkt.clouddn.com/1497929229855.png)

同时，由于范围提升会移除模块外的函数包装，你可能会看到一些小的体积改进。然而，更显着的改进是JavaScript在浏览器中加载的速度。 如果您在比较使用之前和之后时发现加载速度取得了非常棒的改进，请随时回复一些数据，我们将很荣幸分享！

### 🔮 魔法注释 ”Magic Comments” 🔮

当我们在 webpack 2中引入使用动态导入语法（`import()`）时，用户表示，他们不能像使用 `require.ensure` 一样创建命名 chunk。

我们现在介绍由社区创建的“魔法注释”，它可以传递 chunk 名称，还有[**更多功能**](https%3A//medium.com/webpack/how-to-use-webpacks-new-magic-comment-feature-with-react-universal-component-ssr-a38fd3e296a)，例如可以添加更多的内联注释到 `import() `语句中。

```javascript
import(/* webpackChunkName: "my-chunk-name" */  'module');
```

通过使用注释，我们能够在使用动态导入语法的同时，对代码块进行命名。

尽管这是我们在 v2.4 和 v2.6 中发布的技术特性，但在 v3 中，我们修复了这些功能的一些错误，使其变得更稳定。 现在允许动态导入语法具有与`require.ensure`相同的灵活性。

![1497929293139](http://onvaoy58z.bkt.clouddn.com/1497929293139.png)

要了解更多信息，请参阅我们[最新文档的代码分割部分](https://webpack.js.org/guides/code-splitting-async)，新功能部分已经高亮！

### 😍 接下来是什么？😍

我们有很多功能和增强功能想要推出！但我们需要了解用户需求的优先级。所以[访问我们的投票页面，并提出你想看到的功能！](http://webpack.js.org/vote)

这些是我们希望带给您的一些功能：

+ 更好地构建缓存
+ 更快的初始构建和增量构建
+ 更好的TypeScript体验
+ 改进长期缓存
+ WASM模块支持
+ 改善用户体验

## 🙇致谢🙇

感谢我们所有的用户，贡献者，文档作者，博客，赞助商，支持者和维护者。是他们都帮助我们确保 webpack 在未来几年成功。

为此，我们感谢所有人。webpack 发展到现在与你的支持密不可分，我们迫不及待地想要与你分享未来 webpack 的新进展！

没有时间帮助贡献？ 想以其他方式回馈？ 通过捐赠给我们的[[开放集体](http://link.zhihu.com/?target=http%3A//opencollective.com/webpack)](http://opencollective.com/webpack)成为支持者或赞助商。开放集体不仅有助于支持核心团队，而且还支持那些在花了大量空余时间帮助 webpack 进行改善的贡献者！❤