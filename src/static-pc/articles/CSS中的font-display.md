原文：[*font-display*](https://css-tricks.com/almanac/properties/f/font-display)

---

`font-display`属性定义浏览器加载和显示字体文件的方式。 它应用于定义样式表中自定义字体的`@font-face`规则。

```css
@font-face {
  font-family: 'MyWebFont'; /* Define the custom font name */
  src:  url('myfont.woff2') format('woff2'),
        url('myfont.woff') format('woff'); /* Define where the font can be downlaoded */
  font-display: fallback; /* Define how the browser behaves during download */
}
```

## 取值

`font-display` 接受以下五个取值：

+ `auto`：默认值，允许浏览器使用其默认加载方法，通常与`block`值相似。
+ `block`：指示浏览器隐藏文本，直到字体完全下载后再显示。 更准确地说，浏览器会使用无形占位符绘制文本，然后在字体下载完毕再绘制字体。 这也被称为“闪烁的无形文本”或FOIT。
+ `swap`：指示浏览器使用备选字体显示文本，直到自定义字体完全下载。 这也被称为“闪烁的无字母文本”或FOUT。
+ `fallback`：介于 `auto` 和`swap`的中间值，在最开始的100ms左右，浏览器将隐藏文本，100ms后如果字体尚未下载完毕，将使用备选字体，直到自定义字体可供使用。
+ `optional`：和`fallback`类似，该值告诉浏览器最初隐藏文本，然后转换到后备字体，直到自定义字体可用。但是，该值还允许通过检测用户的连接速度决定浏览器确定是否使用自定义字体。

## 用途



## 更多信息

- [CSS Font Rendering Controls Module Level 1 Specification](https://tabatkins.github.io/specs/css-font-display/#font-display-desc): CSS字体渲染规格草案
- [`font-display` for the masses](https://css-tricks.com/font-display-masses/): Jeremy Wagner 介绍了`font-display`的用法
- [Using `@font-face`](https://css-tricks.com/snippets/css/using-font-face/#article-header-id-12): 对`@font-face`的规则和使用方法的全面解释。
- [System Font Stack](https://css-tricks.com/snippets/css/system-font-stack/): 一个仅仅依赖于用户系统字体而实现直接使用自定义字体的代码段
- [Controlling Font Performance with `font-display`](https://developers.google.com/web/updates/2016/02/font-display): Google 对于`font-display`的说明.

## 兼容性

### PC



### 手机/平板电脑



