通过TOC可快速定位，实现页内跳转。

## Markdown编辑器直接生成

### 内置 TOC

一般直接输入`[TOC]`回车即可

+ 如果你的标题都是按照 Markdown 语法书写的话，可以自动生成层级目录。
+ 如果没有效果，请查看你的编辑器是否支持

以我使用的 Typora 为例，输入后会生成

![](http://onvaoy58z.bkt.clouddn.com/TyporaTOC.JPG)



### 导出为 HTML

大部分编辑器都带有导出为 HTML 的功能，要是导出的 HTML 带有 TOC ,需要在 HTML 的 `<head>` 部分添加 JS 代码 ，具体可参考[这篇文章](https://gist.github.com/cloudsben/6059930)，我没有实践过。

## Marked+JS

使用[Marked](https://www.npmjs.com/package/marked)将markdown文件转换为字符串，

我的设置：

```javascript
import marked from 'marked';
let renderer = new marked.Renderer();
marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	tables: true,
	breaks: true,
	pedantic: false,
	sanitize: false,
	smartLists: true,
	smartypants: false
})
renderer.heading = function(text, level) {
	return '<h' + level + ' class="header-TOC" id="' + text + '">' + text + '</h' + level + '>';
}
```

会按照制定规则生成字符串，例：

```javascript
console.log(marked('## 我是二级标题', {renderer: renderer}));
```

输出：

```HTML
<h2 class="header-TOC" id="我是二级标题">
  我是二级标题
</h2>
```

添加 js 代码遍历获得 TOC 数据即可

```javascript
var TOClist = document.getElementsByClassName('header-TOC')
var _str = '';
for (let i = 0; i < TOClist.length; i++) {
		_str += '<a class=TOC-' + TOClist[i].tagName + ' href=#' + TOClist[i].id + '>' + TOClist[i].id + '</a></br>'
}
document.getElementById('category').innerHTML = _str
```

```HTML
<div id="category">
  <!--此处应有TOC-->
</div>
```



## Markdown 美化

github-markdown-css

[https://github.com/sindresorhus/github-markdown-css](https://github.com/sindresorhus/github-markdown-css)

markdown-css-themes

[https://github.com/jasonm23/markdown-css-themes](https://github.com/jasonm23/markdown-css-themes)

markdown-styles

https://github.com/mixu/markdown-styles

美化Markdown输出的HTML文档

[http://www.jianshu.com/p/5166046e6470](http://www.jianshu.com/p/5166046e6470)

