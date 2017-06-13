博客更新后右下角有一个带有折角效果的换色按钮，这里说说如何用CSS实现折角特效。

## 卷曲折角

### Demo

[卷曲折角](http://htmlpreview.github.io/?https://github.com/sangle7/css-page-flip/blob/master/shaddow1.html)



### 效果

![](http://onvaoy58z.bkt.clouddn.com/pageflip1.JPG)



### 原理

使用伪元素添加阴影模拟折角效果

#### 关于伪元素

[CSS 伪元素 (Pseudo-elements)](http://www.w3school.com.cn/css/css_pseudo_elements.asp)

[理解伪元素 :before 和 :after](http://blog.jobbole.com/49173/)

### 代码

```CSS
.pic:before{
    content: "";
    position: absolute;
    width:90%;
    height: 80%;
    left:20px;
    bottom:8px;
    z-index: -1;
    background: transparent;
    box-shadow: 0 8px 20px rgba(0,0,0,0.6);
    -webkit-box-shadow: 0 8px 20px rgba(0,0,0,0.6);
    transform: skew(-12deg) rotate(-4deg);
    -webkit-transform: skew(-12deg) rotate(-4deg);
}

.pic:after{
    content: "";
    position: absolute;
    width:90%;
    height: 80%;
    left:20px;
    bottom:8px;
    z-index: -1;
    background: transparent;
    box-shadow: 0 8px 20px rgba(0,0,0,0.6);
    -webkit-box-shadow: 0 8px 20px rgba(0,0,0,0.6);
    transform: skew(12deg) rotate(4deg);
    -webkit-transform: skew(12deg) rotate(4deg);
}
```

## 静态折角

### Demo

[静态折角](http://htmlpreview.github.io/?https://github.com/sangle7/css-page-flip/blob/master/simple-flip.html)



### 效果

![](http://onvaoy58z.bkt.clouddn.com/pageflip2.JPG)



#### 适用条件

+ 当元素的背景不是纯色，而是一个图案、纹理、照片、渐变，或其它任何这样的背景图像
+ 想要一个不同于`45°`的角

### 代码

```CSS
div {
        background: linear-gradient(-150deg, transparent 1.5em, #6791B0 0);
        position: relative;
 }
div::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 1.73em;
        height: 3em;
        background: linear-gradient(to left bottom, transparent 50%, rgba(0, 0, 0, .2) 0, rgba(0, 0, 0, .4)) 100% 0 no-repeat;
        transform: translateY(-1.3em) rotate(-30deg);
        transform-origin: bottom right;
        border-bottom-left-radius: .5em;
        box-shadow: -.2em .2em .3em -.1em rgba(0, 0, 0, .15)
}
```

**注意：如果想要变换折叠角度，需要根据三角函数重新计算CSS的各项数值，这里的例子为30°折叠角**

### 45度的角

![](http://onvaoy58z.bkt.clouddn.com/pageflip3.JPG)



```CSS
div {
    background:
        linear-gradient(to left bottom, transparent 50%, rgba(0,0,0,.4) 0) 100% 0 no-repeat,
        linear-gradient(-135deg, transparent 1.5em, #558b2f 0);
    background-size: 2em 2em, auto;
}
```

## 动态折角

纯CSS实现的动态折角，利用伪元素和`border`制作，能响应`hover`事件。

### 样式Ⅰ

主要表现为折角部分半透明

#### DEMO

[样式Ⅰ Demo](http://htmlpreview.github.io/?https://github.com/sangle7/css-page-flip/blob/master/flip.html)



#### 代码

```CSS
.image-layer:before{
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        border-style: solid;
        border-width: 0;
        border-color: rgba(0,0,0,0.2) #fff;
        border-radius: 0 0 0 4px;
        box-shadow: 0 1px 1px rgba(0,0,0,0.3), -1px 1px 1px rgba(0,0,0,0.2);
}
.image-layer:before{
        -webkit-transition: all 0.4s ease-out;
        transition:all 0.4s ease-out;
}
.image-layer:hover:before{
        border-right-width:100px;
        border-bottom-width:100px;
}
```

### 样式Ⅱ

折角部分不透明，相当于背面

#### Demo

[样式Ⅱ Demo](http://htmlpreview.github.io/?https://github.com/sangle7/css-page-flip/blob/master/flip-back.html)



#### 代码

```css
.corner {
        width: 120px;
        height: 120px;
        position: absolute;
        top: 0;
        left: 0;
        background: linear-gradient( 135deg, #fff, #f3f3f3 45%, #ddd 50%, #aaa 50%, #bbb 56%, #ccc 62%, #f3f3f3 80%, #fff 100%);
        box-shadow: 0 0 10px rgba(0, 0, 0, .5);
        transition: all .5s ease;
    }
    .corner:before,
    .corner:after {
        content: '';
        position: absolute;
        z-index: -1;
        left: 12.5%;
        bottom: 5.8%;
        width: 70%;
        max-width: 300px;
        max-height: 100px;
        height: 55%;
        box-shadow: 0 12px 15px rgba(0, 0, 0, .3);
        transform: skew(-10deg) rotate(-6deg);
    }    
    .corner:after {
        left: auto;
        right: 5.8%;
        bottom: auto;
        top: 14.16%;
        transform: skew(-15deg) rotate(-84deg);
    }    
    .corner:hover {
        width: 240px;
        height: 240px;
    }   
    .corner:hover:before,
    .corner:hover:after {
        box-shadow: 0 24px 30px rgba(0, 0, 0, .3);
    }
```



## 撕页折角

带有动态效果的折角，这种效果常被应用在网页广告中，不影响网页内容，且用户关注度高。

### 纯CSS版

#### Demo

[Demo](http://htmlpreview.github.io/?https://github.com/sangle7/css-page-flip/blob/master/flip-ad.html)



#### 原理

画了两个角，一个模拟翻页，一个盖住背景，阴影用伪元素模拟。



#### 代码

```css
#content {
        padding: 20px;
}
#content:before {
        content: "";
        width: 80px;
        height: 80px;
        float: right;
}
#cornertip:before,
#cornertip:after {
        background-color: #FFF;
        position: absolute;
        display: block;
        z-index: 2;
        border-top-right-radius: 60%;
        width: 50%;
        height: 50%;
        content: "";
}
#cornertip:before {
        right: 100%;
        top: 0%;
        background: -webkit-radial-gradient(-180% 200%, circle, rgba(255, 255, 255, 0) 85%, rgba(0, 0, 0, .1) 93%);
}
#container:hover #cornertip:before {
        border-right: solid 1px #fff;
}
#container div#corner:hover #cornertip:before {
        border-right: solid 2px #fff;
}
#cornertip:after {
        top: 100%;
        right: 0%;
        background: -webkit-radial-gradient(-250% 320%, circle, rgba(255, 255, 255, 0) 85%, rgba(0, 0, 0, .10) 93%);
}
#container:hover #cornertip:after {
        border-top: solid 1px #fff;
}
#container div#corner:hover #cornertip:after {
        border-top: solid 2px #fff;
}
#corner {
        height: 20px;
        width: 20px;
        right: 0;
        top: 0;
        position: absolute;
        overflow: visible;
}
#container:hover #corner {
        height: 50px;
        width: 50px;
}
#container div#corner:hover {
        height: 100px;
        width: 100px;
}
#corner:before {
        position: absolute;
        top: 0;
        right: 0;
        content: "";
        display: block;
        width: 133%;
        height: 133%;
}
#c-content:after {
        position: absolute;
        top: 0;
        right: 0;
        content: "";
        background: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0) 37%, #DDD 62%, rgba(230, 230, 230, 0.1) 64%, rgba(255, 255, 255, 0) 67%), -webkit-radial-gradient(-50% 150%, circle, transparent 74%, rgba(0, 0, 0, 0.2) 74%, transparent 81%);
        display: block;
        width: 133%;
        height: 133%;
}
#cornertip {
        position: absolute;
        top: 0;
        right: 0;
        content: "";
        background: -webkit-linear-gradient(45deg, #ddd 17%, #dfdfdf 18%, #f5f5f5 30%, #f8f8f8 34%, #eee 39%, rgba(200, 200, 200, 0) 41%);
        display: block;
        width: 100%;
        height: 100%;
}
#c-button {
        position: absolute;
        width: 7em;
        top: 0;
        right: 0;
        background-color: #558b2f;
        color: #fff;
        font-family: Verdana, Geneva, sans-serif;
        text-align: center;
        padding: 8px 5px;
        display: inline-block;
        font-size: 11px;
    }
#c-content {
        width: 125%;
        position: absolute;
        display: block;
        overflow: hidden;
        -webkit-mask: -webkit-linear-gradient(45deg, transparent 49%, #000 53%);
        top: 0;
        right: 0;
        height: 125%;
}
#c-content:before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        background-color: grey;
}
#corner,
#c-content,
#cornertip {
        -webkit-transition-property: all;
        -webkit-transition-duration: .3s;
        -webkit-transition-timing-function: cubic-bezier(0, 0.35, .5, 1.7);
}
    
#bg {
        background-color: grey;
        padding: 20px;
}
```

###  JQuery 版

#### DEMO

[http://www.jq22.com/yanshi368](http://www.jq22.com/yanshi368)

不是自己做的就不上代码了，可以去原链接里看。我不会JQuery。。。



## 撕页换色

效果见本博客右下角

### Demo

[Demo](http://htmlpreview.github.io/?https://github.com/sangle7/css-page-flip/blob/master/color-trans.html)



### 原理

绘制了两个折角，一个用于展示效果，另一个为不带阴影的三角形，用于处理动画效果。

动画部分用`javaScript`中的`setInterval`完成，

**注意：Demo只包括动画部分**



### 代码

#### CSS

```css
#green{
      position:fixed;
      z-index: 10000;
      right:0;bottom: 0;
      width: 0;height: 0;
      border-width: 50px;
      border-style: solid;
      border-bottom-color: #8bc34a;
      border-right-color: #8bc34a;
}
```

CSS用于绘制三角形

#### JavaScript

```javascript
    let _green = document.getElementById('green');
    let i = 35;
    _green.style.display = 'block';
    let timer = setInterval(function() {
        i += 7;
        _green.style.borderWidth = i + 'px'
        if (i >= document.body.clientWidth) {
            nnn()
            clearInterval(timer)
        }
    }, 4)

    function nnn() {
        _green.style.top = 0;
        _green.style.left = 0;
        _green.style.borderColor = 'transparent';
        _green.style.borderTopColor = '#8bc34a';
        _green.style.borderLeftColor = '#8bc34a';
        let timer2 = setInterval(function() {
            i -= 7;
            _green.style.borderWidth = i + 'px';
            if (i <= 0) {
                clearInterval(timer2)
                console.log('stop')
            }
        }, 4)
    }
```

用于控制动画