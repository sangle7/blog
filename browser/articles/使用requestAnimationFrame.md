原文：https://css-tricks.com/using-requestanimationframe

---

以前有一种方法可以在`JavaScript`中执行定时循环：`setInterva()`。 如果你需要重复一些相当快的东西（但不像一个`for`循环一样尽可能快地重复），那么你可以使用它。 为了动画的目的，目标是以每秒60帧的速度使动画平滑，所以你会运行一个这样的循环：

```javascript
setInterval(function() {
  // animiate something
}, 1000/60);
```

现在有一个更好的选择。 [Paul Irish](http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/)在两年前推出了`requestAnimationFrame`。 我没有什么可以补充的，我以前从来没有使用过，而现在，我想我会帮助传播这个词，并写下它的基本用法。

## 为什么更好？

Paul 解释说：

+ 浏览器可以优化它，所以动画将更加流畅
+ 非活动选项卡中的动画将停止，从而降低CPU的使用
+ 更加省电

## 简单示例

```javascript
function repeatOften() {
  // Do whatever
  requestAnimationFrame(repeatOften);
}
requestAnimationFrame(repeatOften);
```

调用它一次，将其关闭，这个函数将递归调用自身。

## 开始和停止

`requestAnimationFrame`返回一个可以用来取消它的ID，就像`setTimeout`或`setInterval`一样。 jQuery在这里只用来演示一个简单的动画和绑定事件。

```javascript
var globalID;

function repeatOften() {
  $("<div />").appendTo("body");
  globalID = requestAnimationFrame(repeatOften);
}

$("#start").on("click", function() {
  globalID = requestAnimationFrame(repeatOften);
});

$("#stop").on("click", function() {
  cancelAnimationFrame(globalID);
});
```

你可以在原文中查看这个实例，如果无法访问，这里有一个简单的[Demo](http://onvaoy58z.bkt.clouddn.com/requestAnimationFrame-simple.html)。

## 兼容性

在[ Can I Use...](http://caniuse.com/#feat=requestanimationframe) 中查看兼容性。

唯一值得注意的问题是IE 9，iOS 5和Android。 但实际上，这并不是一个问题，因为：

## Polyfill 

像许多花哨的网页功能一样，很高兴在可用的时候使用它，在不能使用的情况下你需要依赖一些工具。 对于`requestAnimationFrame`, 最好的办法是参考这个[Gist](https://gist.github.com/paulirish/1579671)。 在使用`requestAnimationFrame`或`cancelAnimationFrame`之前，只需将该chunk包含在你的项目中。

使用这个，你可以在任何浏览器中使用`requestAnimationFrame`。

## 稍复杂的实例

[这里](http://onvaoy58z.bkt.clouddn.com/requestAnimationFrame-complex.html)

实际上更复杂的是几个动画立即运行（仍然可以退回）。 如果你知道这样的例子，请随意在评论中链接一些这样的好处。

