30题目录：[https://javascript30.com/](https://javascript30.com/)

## 最终代码

```javascript
function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }

  function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if (!audio) return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
  }

  const keys = Array.from(document.querySelectorAll('.key'));
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));
  window.addEventListener('keydown', playSound);
```

## transitionend 事件

transitionend 事件在 CSS 完成过渡后触发。

**注意：** 如果过渡在完成前移除，例如 CSS [transition-property](http://www.runoob.com/cssref/css3-pr-transition-property.html) 属性被移除，过渡事件将不被触发。

更多关于 CSS 过渡，请查看我们的 [CSS3 过渡](http://www.runoob.com/css/css3-transitions.html)。

## classList

classList 属性返回元素的类名，作为 DOMTokenList 对象。

该属性用于在元素中添加，移除及切换 CSS 类。

classList 属性是只读的，但你可以使用 add() 和 remove() 方法修改它。

| 方法                            | 描述                                       |
| ----------------------------- | ---------------------------------------- |
| add(*class1, class2, ...*)    | 在元素中添加一个或多个类名。如果指定的类名已存在，则不会添加           |
| contains(*class*)             | 返回布尔值，判断指定的类名是否存在。可能值：true - 元素包已经包含了该类名false - 元素中不存在该类名 |
| item(*index*)                 | 返回类名在元素中的索引值。索引值从 0 开始。如果索引值在区间范围外则返回 *null* |
| remove(*class1, class2, ...*) | 移除元素中一个或多个类名。**注意：** 移除不存在的类名，不会报错。      |
| toggle(*class, *true\|false)  | 在元素中切换类名。第一个参数为要在元素中移除的类名，并返回 false。 如果该类名不存在则会在元素中添加类名，并返回 true。 第二个是可选参数，是个布尔值用于设置元素是否强制添加或移除类，不管该类名是否存在。例如：移除一个 class: *element*.classList.toggle("classToRemove", false); 添加一个 class: *element*.classList.toggle("classToAdd", true);**注意： **Internet Explorer 或 Opera 12 及其更早版本不支持第二个参数。 |

## querySelector()

*querySelector()* 方法返回文档中匹配指定 CSS 选择器的一个元素。

**注意：** *querySelector()* 方法仅仅返回匹配指定选择器的第一个元素。如果你需要返回所有的元素，请使用 *querySelectorAll()* 方法替代。

## Array.from

*Array.from*() 方法从一个类似数组或可迭代的对象中创建一个新的数组实例。

```javascript
Array.from(arrayLike[, mapFn[, thisArg]])
```

`arrayLike`

想要转换成真实数组的类数组对象或可遍历对象。

`mapFn 可选`

可选参数，如果指定了该参数，则最后生成的数组会经过该函数的加工处理后再返回。

`thisArg 可选`

可选参数，执行 `mapFn` 函数时 `this` 的值。