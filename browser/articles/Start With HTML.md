#### 不熟的标签：

`<blockquote>` 定义长的引用

`<code>`定义代码部分

`<sup>`定义上标文本

`<sub>`定义下标文本

`<iframe>`定义内联框架

`<optgroup>`在`<select>`中把相关的选项组合在一起

`<caption>`定义表格标题

`<label>` 定义input元素的标注

**注释："for" 属性可把 label 绑定到另外一个元素。请把 "for" 属性的值设置为相关元素的 id 属性的值。**

`<address>` 定义文档作者或拥有者的联系信息

`<header>`定义一个文档头部部分

`<footer>`定义一个文档底部部分

`<section>`定义一个文档某个区域

`<article>`定义一篇文章内容

`<aside>`定义其所处内容之外的内容

`<hgroup>`定义标题组

`<nav>`定义导航

**下面三个只有webkit支持**

`<details>`定义用户可见或隐藏的需求的补充细节

`<dialog>`定义了一个对话框或窗口

`<summary>`定义了一个可见的标题，当用户点击标题时会显示出详细信息。



`<!DOCTYPE>`告知浏览器用什么标准解析这个文档。DOCTYPE不存在或格式不正确会导致文档以兼容/怪异模式呈现。

`<meta>`

### 语义化

　根据内容的结构化（内容语义化），选择合适的标签（代码语义化）**便于开发者阅读和写出更优雅的代码**的同时让**浏览器的爬虫和机器很好地解析**。

#### 为什么要语义化

- 为了在没有CSS的情况下，页面也能呈现出很好地内容结构、代码结构:为了裸奔时好看；
- 用户体验：例如title、alt用于解释名词或解释图片信息、label标签的活用；
- 有利于[SEO](http://baike.baidu.com/view/1047.htm)：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息：[爬虫](http://baike.baidu.com/view/998403.htm)依赖于标签来确定上下文和各个关键字的权重；
- 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以意义的方式来渲染网页；
- 便于团队开发和维护，语义化更具可读性，是下一步吧网页的重要动向，遵循W3C标准的团队都遵循这个标准，可以减少差异化。

#### 要注意什么？

- 尽可能少的使用无语义的标签div和span；
- 在语义不明显时，既可以使用div或者p时，尽量用p, 因为p在默认情况下有上下间距，对兼容特殊终端有利；
- 不要使用纯样式标签，如：b、font、u等，改用css设置。
- 需要强调的文本，可以包含在strong或者em标签中（浏览器预设样式，能用CSS指定就不用他们），strong默认样式是加粗（不要用b），em是斜体（不用i）；
- 使用表格时，标题要用caption，表头用thead，主体部分用tbody包围，尾部用tfoot包围。表头和一般单元格要区分开，表头用th，单元格用td；
- 表单域要用fieldset标签包起来，并用legend标签说明表单的用途；
- 每个input标签对应的说明文本都需要使用label标签，并且通过为input设置id属性，在lable标签中设置for=someld来让说明文本和相对应的input关联起来。

## meta

charset="UTF-8"

```
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```

**img的alt与title有何异同？**

- alt(alt text):为不能显示图像、窗体或applets的用户代理（UA），alt属性用来指定替换文字。替换文字的语言由lang属性指定。(在IE浏览器下会在没有title时把alt当成 tool tip显示)
- title(tool tip):该属性为设置该属性的元素提供建议性的信息。

**strong与em的异同？**

- strong:粗体强调标签，强调，表示内容的重要性
- em:斜体强调标签，更强烈强调，表示内容的强调点

