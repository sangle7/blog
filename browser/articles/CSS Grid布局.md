## Grid布局是什么

> [CSS Grid Layout](http://www.w3.org/TR/css-grid-1/)是CSS为布局新增的一个模块。网格布局特性主要是针对于Web应用程序的开发者。可以用这个模块实现许多不同的布局。网络布局可以将应用程序分割成不同的空间，或者定义他们的大小、位置以及层级。
>
> 此外，没有内容结构的网格布局有助于使用流体、调整顺序等技术管理或更改布局。通过结合CSS的媒体查询属性，可以控制网格布局容器和他们的子元素，使用页面的布局根据不同的设备和可用空间调整元素的显示风格与定位，而不需要去改变文档结构的本质内容。

简而言之，Grid布局可以使用css创建类似于html中`table`布局的结构，并且对于响应式的支持更好。

## Grid vs Flexbox

> `flexbox`是一维布局，只能在一条直线上放置你的内容区块；而`grid`是一个二维布局。

这里有一个对比二者的[demo](http://onvaoy58z.bkt.clouddn.com/index.html)，来源于http://tutorialzine.com/2017/03/css-grid-vs-flexbox/

## 兼容性

![](http://onvaoy58z.bkt.clouddn.com/caniusegrid.JPG)



## 指南

这里有一份很好的Grid布局指南

http://chris.house/blog/a-complete-guide-css-grid-layout/

## 术语

### 网格线

网格线(Grid Lines)组成网格，是网格的水平和垂直的分界线。

可以引用它的数目或者定义的网格线名称。

![](http://onvaoy58z.bkt.clouddn.com/grid-lines.jpg)

上图突出显示的红线就是第三列的网格线（`line3`）。

### 网格轨道

网格轨道(Grid Track)是相邻两条网格线之间的空间，类似于表格中行或列。所在在网格中其分为`grid column`和`grid row`。每个网格轨道可以设置一个大小，用来控制宽度或高度。

![](http://onvaoy58z.bkt.clouddn.com/grid-track.jpg)

图中突出显示红块的就是行线`line2`和`line3`之间组成的网格轨道。

### 网格单元格

网格单元格(Grid Cell)是指四条网格线之间的空间。它是最小的单位，就像表格中的单元格。

![](http://onvaoy58z.bkt.clouddn.com/grid-cell.jpg)

图中突出显示的单元格是由行线`line2`、`line3`和列表线`line3`、`line4`组成的。

### 网格区域

网格区域是(Grid Area)由任意四条网格线组成的空间，所以他可能包含一个或多个单元格。相当于表格中的合并单元格之后的区域。

![](http://onvaoy58z.bkt.clouddn.com/grid-area.jpg)

图中突出显示的网格区域是行线`line1`、`line3`和列线`line3`、`line4`之间的区域，其主要包括了两个网格单元格。

### 网格容器

通过使用`display`属性给元素显式设置了属性值`grid`或`inline-grid`，此时这个元素将自动变成网格容器(Grid Containers)。这个类似于`flexbox`一样，将元素设置设置为`display:flex`，元素将自动变成弹性盒模型。

由于网格容器不是块容器，所以有部分属性在网格布局中将会失效：

- 多列布局模块中的所有`column-*`属性运用在网格容器上将失效
- `float`和`clear`使用在网格项目（网格单元格Grid Cell）上将失效
- `vertical-align`使用在网格单元格上将失效
- `::first-line`和`::first-letter`这样的伪元素不能应用在网格容器上

### 网格单元格顺序(order)

网格单元格顺序和Flexbox模块一样，通过`order`属性来对网格单父元格进行顺序重排。

## 实际操作

### 定义一个网格

给父容器的`display`属性设置为`grid`或者`inline-grid`来定义一个网格。这样你就可以使用`grid-template-columns`和`grid-template-rows`属性来创建一个网格。

### grid-template-rows

利用以空格分隔的值定义网格的列和行。值的大小代表轨道的大小，并且它们之间的空格表示网格线。

#### 属性值:

- <track-size>: 可以是一个长度、百分比或者是网格中自由空间的一小部分(使用fr单位)
- <line-name>: 可以为网格线命名（非必需）
- subgrid - 如果你的网格容器本身就是一个网格项(即嵌套网格)，你可以使用此属性指定行和列的大小继承于父元素而不是自身指定。

------

```
.container{
    grid-template-columns: <track-size> ... | <line-name> <track-size> ... | subgrid;
    grid-template-rows: <track-size> ... | <line-name> <track-size> ... | subgrid;
}
```

#### 示例:

当你在值之间留有空格时，网络线就会自动分配数值名称:

```
.container{
    grid-template-columns: 40px 50px auto 50px 40px;
    grid-template-rows: 25% 100px auto;
}
```

![](http://www.admin10000.com/UploadFiles/Document/201604/10/20160410080209101195.PNG)

fr 单位允许你将一个轨道大小设置为网格容器内自由空间的一小部分。如下所示，每个网格项就会占据网格容器宽度的三分之一:

```
.container{
    grid-template-columns: 1fr 1fr 1fr;
}
```

### grid-template-areas

使用grid-area属性定义网格区域名称，从而定义网格模板。网格区域重复的名称就会导致内容跨越这些单元格。句点表示一个空单元格。语法本身提供了一种可视化的网格结构。

#### 属性值:

- <grid-area-name>: 使用grid-area属性定义网格区域名称
- .: 句点表示一个空单元格
- none: 无网格区域被定义

#### 示例：

在Demo中，我们给`.container`容器定义了以下样式：

```CSS
.container{
    max-width: 900px;
    background-color: #fff;
    margin: 0 auto;
    padding: 0 60px;
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-areas: 
        "header header"
        "main sidebar"
        "footer footer";
    grid-gap: 60px;
}
```

其中`grid-template-columns`定义了一个两列三行的表格，每个区域命名如下图。

![](http://onvaoy58z.bkt.clouddn.com/demo-container.jpg)

**注意：**

所声明的每一行都需要具有相同数目的单元格。

当你使用此语法时，区域两边的线就会得到自动命名。如果网格区域名称为foo,则其行线和列线的名称就将为foo-start，最后一行线及其最后一列线的名字就会为foo-end。

你可以使用句点(.)声明单个空单元格。例如：

```CSS
.container{
    grid-template-areas: "header header header header"
                         "main main . sidebar"
                         "footer footer footer footer"
}
```

会生成下图：

![](http://onvaoy58z.bkt.clouddn.com/demo-container-empty.jpg)

其中灰色格子为空单元格。

### grid-column-gap和grid-row-gap

指定网格线的大小。你可以把它想像成在行/列之间设置间距宽度。

#### 属性值:

- <line-size>: 一个长度值

```
.container{
    grid-column-gap: <line-size>;
    grid-row-gap: <line-size>;
}
```

#### 示例:

```
.container{
    grid-template-columns: 100px 50px 100px;
    grid-template-rows: 80px auto 80px; 
    grid-column-gap: 10px;
    grid-row-gap: 15px;
}
```

### justify-items

沿列轴对齐网格项中的内容(相反于align-item属性定义的沿行轴对齐)。此值适用于容器内所有的网格项。

#### 属性值:

- start: 内容与网格区域的左端对齐
- end: 内容与网格区域的右端对齐
- center: 内容处于网格区域的中间位置
- stretch: 内容宽度占据整个网格区域空间(默认值)

### align-items

沿行轴对齐网格项中的内容(相反于justify-item属性定义的沿列轴对齐)。此值适用于容器内所有的网格项。

#### 属性值:

- start: 内容与网格区域的顶端对齐
- end: 内容与网格区域的底部对齐
- center: 内容处于网格区域的中间位置
- stretch: 内容高度占据整个网格区域空间(默认值)

### justify-content

当你使用px这种非响应式的单位对你的网格项进行大小设置时，就有可能出现一种情况--你的网格大小可能小于其网格容器的大小。在这种情况下，你就可以设置网格容器内网格的对齐方式。此属性会将网格沿列轴进行对齐(相反于align-content属性定义的沿行轴对齐)。

#### 属性值:

- start: 网格与网格容器的左端对齐
- end: 网格与网格容器的右端对齐
- center: 网格处于网格容器的中间
- stretch: 调整网格项的大小，使其宽度填充整个网格容器
- space-around: 在网格项之间设置偶数个空格间隙，其最边缘间隙大小为中间空格间隙大小的一半
- space-between: 在网格项之间设置偶数个空格间隙，其最边缘不存在空格间隙
- space-evenly: 在网格项之间设置偶数个空格间隙，同样适用于最边缘区域

### align-content

当你使用px这种非响应式的单位对你的网格项进行大小设置时，就有可能出现一种情况--你的网格大小可能小于其网格容器的大小。在这种情况下，你就可以设置网格容器内网格的对齐方式。此属性会将网格沿行轴进行对齐(相反于justify-content属性定义的沿列轴对齐)。

#### 属性值:

- start: 网格与网格容器的顶端对齐
- end: 网格与网格容器的底部对齐
- center: 网格处于网格容器的中间
- stretch: 调整网格项的大小，使其高度填充整个网格容器
- space-around: 在网格项之间设置偶数个空格间隙，其最边缘间隙大小为中间空格空隙大小的一半
- space-between: 在网格项之间设置偶数个空格间隙，其最边缘不存在空格间隙
- space-evenly: 在网格项之间设置偶数个空格间隙，同样适用于最边缘区域



## 单元格属性

### justify-self

沿列轴对齐网格项中的内容(相反于align-item属性定义的沿行轴对齐)。此值适用于单一网格项中的内容。

#### 属性值:

- start: 内容与网格区域的左端对齐
- end: 内容与网格区域的右端对齐
- center: 内容处于网格区域的中间位置
- stretch: 内容宽度占据整个网格区域空间(默认值)

例如demo中的`button`

```css
header button {
    justify-self: end;
}
```

设置网格中所有网格项的对齐方式，可以使用网格容器上的justify-items属性。

### align-self

沿行轴对齐网格项中的内容(相反于justify-item属性定义的沿列轴对齐)。此值适用于单一网格项中的内容。

#### 属性值:

- start: 内容与网格区域的顶端对齐
- end: 内容与网格区域的底部对齐
- center: 内容处于网格区域的中间位置
- stretch: 内容高度占据整个网格区域空间(默认值)

### grid-area

给网格项进行命名

```CSS
.sidebar {
    grid-area: sidebar;
    border: 1px solid #a2a2a2;
    padding: 20px;
}

```

