### 加载方式

#### Link 与 @import 差异

1. 来源与作用。 link 属于 XHTML 标签， 除了可以加载CSS外， 还可以定义RSS, 定义rel 连接属性等其他作用； 而@import 完全是CSS提供的一种方式， 只能加载CSS。
2. 加载顺序不同。 link 引用的CSS会在页面被加载的时候同时加载；而@import 引用的CSS会等到页面全部被下载完再被加载， 所以有时候会出现开始没有样式，之后页面闪烁一下出现样式（在网速慢的时候会更明显）。
3. 兼容性的差别。 @import 是CSS2.1 提出的，link 浏览器都支持。
4. 使用[JavaScript](http://lib.csdn.net/base/javascript) 可以控制到 link, 但@import 却无法控制。

#### 固定宽度元素水平居中

```css
{
  max-width:600px;//使浏览器更好的适应移动设备
  margin:0 auto;
}
```

### position

`static` 是默认值。任意 `position: static;` 的元素不会被特殊的定位。一个 static 元素表示它*不会被“positioned”*，一个 position 属性被设置为其他值的元素表示它*会被“positioned”*。

`relative` 表现的和 `static` 一样，除非你添加了一些额外的属性。在一个相对定位（position属性的值为relative）的元素上设置 `top`、 `right` 、 `bottom` 和 `left` 属性会使其偏离其正常位置。其他的元素的位置则不会受该元素的影响发生位置改变来弥补它偏离后剩下的空隙。

一个固定定位（position属性的值为fixed）元素会相对于视窗来定位，这意味着即便页面滚动，它还是会停留在相同的位置。和 `relative` 一样， `top` 、 `right` 、 `bottom` 和 `left` 属性都可用。

`absolute` 是最棘手的position值。 `absolute` 与 `fixed` 的表现类似，但是它不是相对于视窗而是相对于*最近的“positioned”祖先元素*。如果绝对定位（position属性的值为absolute）的元素没有“positioned”祖先元素，那么它是相对于文档的 body 元素，并且它会随着页面滚动而移动。记住一个“positioned”元素是指 position 值不是 `static` 的元素。

### float

常用于文字环绕图片

```css
img {
  float: right;
  margin: 0 0 1em 1em;
}
.after-box {
  clear: both;//清除浮动使其保持DOM顺序
}
```

### 清除浮动的方法

+ after伪类**（推荐）**：

  ```CSS
  :after{
              content:".";
              clear:both;
              display:block;
              height:0;
              overflow:hidden;
              visibility:hidden;
   }
  ```

  **IE6还要加上`zoom:1;`**


+ `clear: both;`作用于浮动元素的相邻元素(下方元素)

+ 父元素塌陷时可以通过指定高度清除浮动

+ 父元素同时浮动（缺点：每一级父元素都要浮动，而且下方的元素会上浮）

+ `display:inline-block;`作用于父元素（ 缺点：有间距，无法使用margin: 0 auto;居中）

+ ` <br clear="both" />`清除浮动（....）

+ `overflow:hidden;`作用于父元素

+ `overflow:auto;`作用于父元素

  **IE6还要加上`zoom:1;`**

### display

你可以使用 `inline-block` 来布局。有一些事情需要你牢记：

- `vertical-align` 属性会影响到 `inline-block` 元素，你可能会把它的值设置为 `top` 。
- 你需要设置每一列的宽度
- 如果HTML源代码中元素之间有空格，那么列与列之间会产生空隙

### column

这里有一系列新的CSS属性，可以帮助你很轻松的实现文字的多列布局。让我们瞧瞧：

```css
.three-column {
  padding: 1em;
  -moz-column-count: 3;
  -moz-column-gap: 1em;
  -webkit-column-count: 3;
  -webkit-column-gap: 1em;
  column-count: 3;
  column-gap: 1em;
}
```

CSS columns是很新的标准，所以你需要使用前缀，并且它不被[IE9及以下和Opera Mini](http://caniuse.com/#search=column)支持。

### flexbox

使用以下代码可以简单设置垂直水平居中

```css
.vertical-container {
  height: 300px;
  display: -webkit-flex;
  display:         flex;
  -webkit-align-items: center;
          align-items: center;
  -webkit-justify-content: center;
          justify-content: center;
}
```

## 布局方式

### flex布局

#### flex容器

首先，实现 flex 布局需要先指定一个容器，任何一个容器都可以被置顶为 flex 布局，这样容器内部的元素就可以使用 flex 来进行布局。

```css
.container {
    display: flex | inline-flex;    //可以有两种取值
}
```

分别生成一个块状或行内的 flex 容器盒子。简单说来，如果你使用块元素如 div，你就可以使用 flex，而如果你使用行内元素，你可以使用 inline-flex。

**需要注意的是：当时设置 flex 布局之后，子元素的 float、clear、vertical-align 的属性将会失效。**

有下面六种属性可以设置在容器上，它们分别是：

1. flex-direction
2. flex-wrap
3. flex-flow
4. justify-content
5. align-items
6. align-content

**1. flex-direction: 决定主轴的方向(即项目的排列方向)**

```CSS
.container {
    flex-direction: row | row-reverse | column | column-reverse;
}
```

默认值：row，主轴为水平方向，起点在左端。

![flex-direction-row](http://pic2.zhimg.com/v2-ae8828b8b022dc6f1b28d5b4f7082e91_b.png)

row-reverse：主轴为水平方向，起点在右端

![img](http://pic3.zhimg.com/v2-215c8626ac95e97834eddb552cfa148a_b.png)column：主轴为垂直方向，起点在上沿

![img](http://pic1.zhimg.com/v2-33efe75d166a47588e0174d0830eb020_b.png)



column-reverse：主轴为垂直方向，起点在下沿

![img](http://pic2.zhimg.com/v2-344757e0fb7eee11e75b127b8485e679_b.png)

**2. flex-wrap: 决定容器内项目是否可换行**

默认情况下，项目都排在主轴线上，使用 flex-wrap 可实现项目的换行。

```
.container {
    flex-wrap: nowrap | wrap | wrap-reverse;
}

```

默认值：nowrap 不换行，即当主轴尺寸固定时，当空间不足时，项目尺寸会随之调整而并不会挤到下一行。

![img](http://pic4.zhimg.com/v2-a590927ad6d83de8840d52a0cf2f0df3_b.png)

wrap：项目主轴总尺寸超出容器时换行，第一行在上方

![img](http://pic2.zhimg.com/v2-426949b061e8179aab00cacda8168651_b.png)

wrap-reverse：换行，第一行在下方

![img](http://pic2.zhimg.com/v2-91c53ebf744814e1ab60267643866439_b.png)

**3. flex-flow: flex-direction 和 flex-wrap 的简写形式**

```CSS
.container {
    flex-flow: <flex-direction> || <flex-wrap>;
}
```

默认值为: row nowrap，感觉没什么卵用，老老实实分开写就好了。这样就不用记住这个属性了。

**4. justify-content：定义了项目在主轴的对齐方式。**

```CSS
.container {
    justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

**建立在主轴为水平方向时测试，即 flex-direction: row**

默认值: flex-start 左对齐

![img](http://pic1.zhimg.com/v2-1bafab80044a7ab2a6198d5937172eb0_b.png)flex-end：右对齐

![img](http://pic3.zhimg.com/v2-8b163809a4c944486a127a7c22eee7b2_b.png)center：居中

![img](http://pic4.zhimg.com/v2-dea82c75d35f532d35a52d1f9c1c762b_b.png)space-between：两端对齐，项目之间的间隔相等，即剩余空间等分成间隙。

![img](http://pic1.zhimg.com/v2-ea4061e0f64dd8d7a1fcb5b0ad6f96a8_b.png)space-around：每个项目两侧的间隔相等，所以项目之间的间隔比项目与边缘的间隔大一倍。

![img](http://pic1.zhimg.com/v2-42a358111a221ff52768bdd55238eb0c_b.png)

**5. align-items: 定义了项目在交叉轴上的对齐方式**

```css
.container {
    align-items: flex-start | flex-end | center | baseline | stretch;
}
```

**建立在主轴为水平方向时测试，即 flex-direction: row**

默认值为 stretch 即如果项目未设置高度或者设为 auto，将占满整个容器的高度。

![img](http://pic2.zhimg.com/v2-0cced8789b0d73edf0844aaa3a08926d_b.png)假设容器高度设置为 100px，而项目都没有设置高度的情况下，则项目的高度也为 100px。

flex-start：交叉轴的起点对齐

![img](http://pic3.zhimg.com/v2-26d9e85039beedd78e412459bd436e8a_b.png)

假设容器高度设置为 100px，而项目分别为 20px, 40px, 60px, 80px, 100px, 则如上图显示。

flex-end：交叉轴的终点对齐

![img](http://pic4.zhimg.com/v2-8b65ee47605a48ad2947b9ef4e4b01b3_b.png)

center：交叉轴的中点对齐

![img](http://pic3.zhimg.com/v2-7bb9d8385273d8ad469605480f40f8f2_b.png)baseline: 项目的第一行文字的基线对齐

![img](http://pic3.zhimg.com/v2-abf7ac4776302ad078986f7cd0dddaee_b.png)

以文字的底部为主，仔细看图可以理解。

**6. align-content: 定义了多根轴线的对齐方式，如果项目只有一根轴线，那么该属性将不起作用**

```
.container {
    align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}

```

这个这样理解：

当你 flex-wrap 设置为 nowrap 的时候，容器仅存在一根轴线，因为项目不会换行，就不会产生多条轴线。

当你 flex-wrap 设置为 wrap 的时候，容器可能会出现多条轴线，这时候你就需要去设置多条轴线之间的对齐方式了。

建立在主轴为水平方向时测试，即 flex-direction: row, flex-wrap: wrap

默认值为 stretch，看下面的图就很好理解了



flex-start：轴线全部在交叉轴上的起点对齐

![img](http://pic2.zhimg.com/v2-61d92d7dc68e3d7d415a16830050fd11_b.png)flex-end：轴线全部在交叉轴上的终点对齐

![img](http://pic2.zhimg.com/v2-0a0a7f10c50596aade787ae11b7b0a75_b.png)center：轴线全部在交叉轴上的中间对齐![img](http://pic1.zhimg.com/v2-dcf53fce8dbcde7da9c677dd1a033860_b.png)space-between：轴线两端对齐，之间的间隔相等，即剩余空间等分成间隙。

![img](http://pic2.zhimg.com/v2-d80940f71e1e08d45d3d6df4c5401d0d_b.png)space-around：每个轴线两侧的间隔相等，所以轴线之间的间隔比轴线与边缘的间隔大一倍。

![img](http://pic2.zhimg.com/v2-7c4d5c01f3851a3cec7f8487c6edb21d_b.png)到这里关于容器上的所有属性都讲完了，接下来就来讲讲关于在 flex item 上的属性。

## Flex 项目属性：

有六种属性可运用在 item 项目上：

1. order
2. flex-basis
3. flex-grow
4. flex-shrink
5. flex
6. align-self

**1. order: 定义项目在容器中的排列顺序，数值越小，排列越靠前，默认值为 0**

```css
.item {
    order: <integer>;
}
```

![img](http://pic3.zhimg.com/v2-d606874ac9c496b3a0e46573c85e4376_b.png)在 HTML 结构中，虽然 -2，-1 的 item 排在后面，但是由于分别设置了 order，使之能够排到最前面。

**2. flex-basis: 定义了在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间**

```
.item {
    flex-basis: <length> | auto;
}

```

默认值：auto，即项目本来的大小, 这时候 item 的宽高取决于 width 或 height 的值。

**当主轴为水平方向的时候，当设置了 flex-basis，项目的宽度设置值会失效，flex-basis 需要跟 flex-grow 和 flex-shrink 配合使用才能发挥效果。**

- 当 flex-basis 值为 0 % 时，是把该项目视为零尺寸的，故即使声明该尺寸为 140px，也并没有什么用。
- 当 flex-basis 值为 auto 时，则跟根据尺寸的设定值(假如为 100px)，则这 100px 不会纳入剩余空间。

3**. flex-grow: 定义项目的放大比例**

```
.item {
    flex-grow: <number>;
}

```

默认值为 0，即如果存在剩余空间，也不放大

![img](http://pic4.zhimg.com/v2-5f7898c1f51fa7274a2c0b4a9dfd88c3_b.png)当所有的项目都以 flex-basis 的值进行排列后，仍有剩余空间，那么这时候 flex-grow 就会发挥作用了。

如果所有项目的 flex-grow 属性都为 1，则它们将等分剩余空间。(如果有的话)

如果一个项目的 flex-grow 属性为 2，其他项目都为 1，则前者占据的剩余空间将比其他项多一倍。

当然如果当所有项目以 flex-basis 的值排列完后发现空间不够了，且 flex-wrap：nowrap 时，此时 flex-grow 则不起作用了，这时候就需要接下来的这个属性。

**4. flex-shrink: 定义了项目的缩小比例**

```
.item {
    flex-shrink: <number>;
}

```

默认值: 1，即如果空间不足，该项目将缩小，负值对该属性无效。

![img](http://pic4.zhimg.com/v2-383e97971a7fc8c4f84e6a85406dbcaf_b.png)这里可以看出，虽然每个项目都设置了宽度为 50px，但是由于自身容器宽度只有 200px，这时候每个项目会被同比例进行缩小，因为默认值为 1。

同理可得：

如果所有项目的 flex-shrink 属性都为 1，当空间不足时，都将等比例缩小。 

如果一个项目的 flex-shrink 属性为 0，其他项目都为 1，则空间不足时，前者不缩小。

**5. flex: flex-grow, flex-shrink 和 flex-basis的简写**

```
.item{
    flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
} 
```

flex 的默认值是以上三个属性值的组合。假设以上三个属性同样取默认值，则 flex 的默认值是 0 1 auto。

有关快捷值：auto (1 1 auto) 和 none (0 0 auto)

关于 flex 取值，还有许多特殊的情况，可以按以下来进行划分：

- 当 flex 取值为一个非负数字，则该数字为 flex-grow 值，flex-shrink 取 1，flex-basis 取 0%，如下是等同的：

```
.item {flex: 1;}
.item {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
}

```

- 当 flex 取值为 0 时，对应的三个值分别为 0 1 0%

```
.item {flex: 0;}
.item {
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: 0%;
}

```

- 当 flex 取值为一个长度或百分比，则视为 flex-basis 值，flex-grow 取 1，flex-shrink 取 1，有如下等同情况（注意 0% 是一个百分比而不是一个非负数字）

```
.item-1 {flex: 0%;}
.item-1 {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0%;
}

.item-2 {flex: 24px;}
.item-2 {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 24px;
}

```

- 当 flex 取值为两个非负数字，则分别视为 flex-grow 和 flex-shrink 的值，flex-basis 取 0%，如下是等同的：

```
.item {flex: 2 3;}
.item {
    flex-grow: 2;
    flex-shrink: 3;
    flex-basis: 0%;
}

```

- 当 flex 取值为一个非负数字和一个长度或百分比，则分别视为 flex-grow 和 flex-basis 的值，flex-shrink 取 1，如下是等同的：

```
.item {flex: 11 32px;}
.item {
    flex-grow: 11;
    flex-shrink: 1;
    flex-basis: 32px;
}

```

建议优先使用这个属性，而不是单独写三个分离的属性。

1. 当 flex-wrap 为 wrap | wrap-reverse，且子项宽度和不及父容器宽度时，flex-grow 会起作用，子项会根据 flex-grow 设定的值放大（为0的项不放大）
2. 当 flex-wrap 为 wrap | wrap-reverse，且子项宽度和超过父容器宽度时，首先一定会换行，换行后，每一行的右端都可能会有剩余空间（最后一行包含的子项可能比前几行少，所以剩余空间可能会更大），这时 flex-grow 会起作用，若当前行所有子项的 flex-grow 都为0，则剩余空间保留，若当前行存在一个子项的 flex-grow 不为0，则剩余空间会被 flex-grow 不为0的子项占据
3. 当 flex-wrap 为 nowrap，且子项宽度和不及父容器宽度时，flex-grow 会起作用，子项会根据 flex-grow 设定的值放大（为0的项不放大）
4. 当 flex-wrap 为 nowrap，且子项宽度和超过父容器宽度时，flex-shrink 会起作用，子项会根据 flex-shrink 设定的值进行缩小（为0的项不缩小）。但这里有一个较为特殊情况，就是当这一行所有子项 flex-shrink 都为0时，也就是说所有的子项都不能缩小，就会出现讨厌的横向滚动条

**6. align-self: 允许单个项目有与其他项目不一样的对齐方式**

单个项目覆盖 align-items 定义的属性

默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。

```
.item {
     align-self: auto | flex-start | flex-end | center | baseline | stretch;
}

```

这个跟 align-items 属性时一样的，只不过 align-self 是对单个项目生效的，而 align-items 则是对容器下的所有项目生效的。