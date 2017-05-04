## counter-reset属性

对部分和子部分进行编号（比如 "Section 1"、"1.1"、"1.2"）的方法：

### 定义和用法

`counter-reset` 属性设置某个选择器出现次数的计数器的值。默认为 0。

利用这个属性，计数器可以设置或重置为任何值，可以是正值或负值。如果没有提供 number，则默认为 0。

注释：如果使用 `display: none`，则无法重置计数器。如果使用 `visibility: hidden`，则可以重置计数器。

## 代码

```CSS
#main {
    counter-reset: h1
}

h1 {
    counter-reset: h2
}

h2 {
    counter-reset: h3
}

h3 {
    counter-reset: h4
}

h4 {
    counter-reset: h5
}

h5 {
    counter-reset: h6
}

#main h1:before {
    counter-increment: h1;
    content: counter(h1) ". "
}

#main h2:before {
    counter-increment: h2;
    content: counter(h1) "." counter(h2) ". "
}

#main h3:before {
    counter-increment: h3;
    content: counter(h1) "." counter(h2) "." counter(h3) ". "
}

#main h4:before {
    counter-increment: h4;
    content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) ". "
}

#main h5:before {
    counter-increment: h5;
    content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) ". "
}

#main h6:before {
    counter-increment: h6;
    content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) "." counter(h6) ". "
}

```

## 效果

``` markdown
# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6
```

![](http://onvaoy58z.bkt.clouddn.com/Numbering.PNG)





