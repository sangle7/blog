30题目录：[https://javascript30.com/](https://javascript30.com/)

## 最终代码

```javascript
const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
```

```css
:root {
  --base: #ffc600;
  --spacing: 10px;
    --blur: 10px;
}
img {
  padding: var(--spacing);
  background: var(--base);
  filter: blur(var(--blur));
}
.hl {
  color: var(--base);
}
```

## dataset

在HTML5中我们可以使用`data-`前缀设置我们需要的自定义属性，来进行一些数据的存放，例如我们要在一个文字按钮上存放相对应的id：

```html
<a href="javascript:" data-id="2312">测试</a>
```

这里的`data-`前缀就被称为`data属性`，其可以通过脚本进行定义，也可以应用CSS属性选择器进行样式设置。数量不受限制，在控制和渲染数据的时候提供了非常强大的控制。

下面是元素应用data属性的一个例子：

```html
<div id="day2-meal-expense" 
  data-drink="coffee" 
  data-food="sushi" 
  data-meal="lunch">¥20.12</div>
```

要想获取某个属性的值，可以像下面这样使用dataset对象：

```js
var expenseday2 = document.getElementById('day2-meal-expense');  
var typeOfDrink = expenseday2.dataset.drink;
```

需要注意的是带连字符连接的名称在使用的时候需要命名驼峰化，即大小写组合书写，这与应用元素的style对象类似，`dom.style.borderColor`。例如，假设上面的例子中现在有如下data属性，`data-meal-time`，则我们要获取相应的值可以使用：

```javascript
expenseday2.dataset.mealTime
```

## CSS变量

CSS 变量是由网页的作者或用户定义的实体，用来指定文档中的特定变量。使用自定义属性来设置变量名，并使用特定的 var() 来访问。（比如 color:var(--main-color);）。

### 基本用法

声明一个变量：

```CSS
element {
  --main-bg-color: brown;
}
```

使用变量：

```CSS
element {
  background-color: var(--main-bg-color);
}
 
```

## 解决的问题

在构建大型站点时，作者通常会面对可维护性的挑战。在这些网页中， 所使用的 CSS 的数量是非常庞大的，并且在许多场合大量的信息会重复使用。例如，在网页中维护一个配色方案，意味着一些颜色在CSS文件中多次出现，并被重复使用。当你修改配色方案时，不论是调整某个颜色或完全修改整个配色，都会成为一个复杂的问题，不容出错，而单纯查找替换是远远不够的。

如果使用了 CSS 框架，这种情况会变得尤其糟糕，此时如果要修改颜色，则需要对框架本身进行修改。在这些场合使用 LESS 或 Sass 类似的预处理器是非常有帮助的，但是这种通过添加额外步骤的方式，可能会增加系统的复杂性。CSS变量为我们带来一些预处理器的便利，并且不需要额外的编译。

这些变量的第二个优势就是名称本身就包含了语义的信息。CSS 文件变得易读和理解。main-text-color比文档中的#00ff00更容易理解，特别是同样的颜色出现在不同的文件中的时候。

## CSS变量能帮助我们干什么

在一些命令式编程语言中，像Java、C++亦或是JavaScript，通过变量我们能够跟踪某些状态。变量是一种符号，关联着一个特定的值，变量的值能随着时间的推移而改变。

在像CSS这种声明式语言中，随着时间而改变的值并不存在，也就没有所谓变量的概念了。

CSS 引入了一种层级变量的概念，从而能够从容应对可维护性的挑战。这就会使得在整个 CSS tree 中都可以象征性的引用一个变量。

## 什么是CSS变量

CSS 变量当前有两种形式：

- 变量，就是拥有合法标识符和合法的值。可以被使用在任意的地方。可以使用var()函数使用变量。例如：var(--example-variable)会返回--example-variable所对应的值
- 自定义属性。这些属性使用--*where*的特殊格式作为名字。例如--example-variable: 20px;即使一个css声明语句。意思是将20px赋值给--example-varibale变量。

CSS变量的继承
自定义属性同样支持继承。一个元素上没有定义自定义属性，该自定义属性的值会继承其父元素：
```HTML
<div class="one">
  <div class="two">
    <div class="three">
    </div>
    <div class="four">
    </div>
  <div>
</div>
```
定义下面的CSS：

```CSS
.two { --test: 10px; }
.three { --test: 2em; }
```
在这个例子中，var(--test)的结果是：

+ class="two" 对应的节点: 10px
+ class="three" 对应的节点: element: 2em
+ class="four" 对应的节点: 10px (inherited from its parent)
+ class="one" 对应的节点: 无效值, 即此属性值为未被自定义css变量覆盖的默认值