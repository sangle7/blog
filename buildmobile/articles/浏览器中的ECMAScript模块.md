最近正值考试周，所以博客更新的比较少。

原文：[https://jakearchibald.com/2017/es-modules-in-browsers/](https://jakearchibald.com/2017/es-modules-in-browsers/)

---

ES模块现在可以在以下浏览器中使用！包括：

+ Safari 10.1。
+ Chrome Canary 60 - 在chrome:flags中开启Experimental Web Platform
+ Firefox 54 - 在about:config中的开启dom.moduleScripts
+ Edge 15 -  在about:flags中的开启Experimental JavaScript Features

```html
<script type="module">
  import {addTextToBody} from './utils.js';

  addTextToBody('Modules are pretty cool.');
</script>
```

```javascript
// utils.js
export function addTextToBody(text) {
  const div = document.createElement('div');
  div.textContent = text;
  document.body.appendChild(div);
}
```

[**Live demo**.](https://cdn.rawgit.com/jakearchibald/a298d5af601982c338186cd355e624a8/raw/aaa2cbee9a5810d14b01ae965e52ecb9b2965a44/)

你只需要在脚本元素上设置`type = module`，浏览器会将内联或外部脚本视为ECMAScript模块。

## 目前不支持“裸”import

```javascript
// Supported:
import {foo} from 'https://jakearchibald.com/utils/bar.js';
import {foo} from '/utils/bar.js';
import {foo} from './bar.js';
import {foo} from '../bar.js';

// Not supported:
import {foo} from 'bar.js';
import {foo} from 'utils/bar.js';
```

有效的模块说明符必须符合以下条件之一：

+ 一个完整的非相对URL。 就像上面写的，当通过`new URL(moduleSpecifier)`时，它不会抛出错误。
+ 以/.开始 
+ 以./.开始 
+ 以../.开始 

其他说明符保留供将来使用，如导入内置模块。

## nomodule向后兼容

```html
<script type="module" src="module.js"></script>
<script nomodule src="fallback.js"></script>
```

[**Live demo**.](https://cdn.rawgit.com/jakearchibald/6110fb6df717ebca44c2e40814cc12af/raw/7fc79ed89199c2512a4579c9a3ba19f72c219bd8/)

允许使用`type=module`的浏览器会忽视含有`nomodule`属性的标签。这意味着你可以将模块树提供给支持模块的浏览器，同时提供对其他浏览器提供正常文件。

### 浏览器问题

+ Firefox不支持nomodule。 这个问题在Firefox nightly 版本中得到了修复。
+ Edge不支持nomodule。
+ Safari 10.1不支持nomodule，但它在最新的技术预览中已经修复了。 对于10.1，有一个非常聪明的解决方法。

## 默认延迟

```html
<!-- This script will execute after… -->
<script type="module" src="1.js"></script>

<!-- …this script… -->
<script src="2.js"></script>

<!-- …but before this script. -->
<script defer src="3.js"></script>
```

## 

```html
<script type="module" src="module.js"></script>
<script nomodule src="fallback.js"></script>
```

[**Live demo**.](https://cdn.rawgit.com/jakearchibald/d6808ea2665f8b3994380160dc2c0bc1/raw/c0a194aa70dda1339c960c6f05b2e16988ee66ac/)  顺序会是 `2.js`, `1.js`, `3.js`

脚本在抓取过程中阻止HTML解析器的方法是非常非常不好的。使用常规方式加载脚本，您可以使用`defer`来防止阻塞，这也会拖延脚本执行，直到文档完成解析，并且使用其他延迟脚本维护执行顺序。 模块脚本的行为默认为`defer` - 这使模块脚本在抓取时永远不会阻止HTML解析器。

模块脚本与使用`defer`的常规脚本使用相同的执行队列。

## 内联脚本也被延迟

```html
<!-- This script will execute after… -->
<script type="module">
  addTextToBody("Inline module executed");
</script>

<!-- …this script… -->
<script src="1.js"></script>

<!-- …and this script… -->
<script defer>
  addTextToBody("Inline script executed");
</script>

<!-- …but before this script. -->
<script defer src="2.js"></script>
```

[**Live demo**.](https://cdn.rawgit.com/jakearchibald/7026f72c0675898196f7669699e3231e/raw/fc7521aabd9485f30dbd5189b407313cd350cf2b/)  顺序会是  `1.js`,内联脚本，内联模块 ,`2.js`

常规内联脚本忽略`defer`，而内联模块脚本总是被延迟，无论它们是否导入任何东西。

## 外部或内联模块上的Async

```html
<!-- This executes as soon as its imports have fetched -->
<script async type="module">
  import {addTextToBody} from './utils.js';

  addTextToBody('Inline module executed.');
</script>

<!-- This executes as soon as it & its imports have fetched -->
<script async type="module" src="1.js"></script>
```

[**Live demo**.](https://module-script-tests-rgjnxtrtqq.now.sh/async)  快速下载脚本应该在慢速下载脚本之前执行。

与常规脚本一样，`async`导致脚本下载而不阻止HTML解析器，并尽快执行。 与常规脚本不同，`async`也适用于内联模块。

与普通的`async`一样，脚本可能不会按照它们在DOM中显示的顺序执行。

### 浏览器问题

+ Firefox 不支持内联脚本的 `async` 属性

## 模块只执行一次

```html
<!-- 1.js only executes once -->
<script type="module" src="1.js"></script>
<script type="module" src="1.js"></script>
<script type="module">
  import "./1.js";
</script>

<!-- Whereas normal scripts execute multiple times -->
<script src="2.js"></script>
<script src="2.js"></script>
```

[**Live demo**.](https://cdn.rawgit.com/jakearchibald/f7f6d37ef1b4d8a4f908f3e80d50f4fe/raw/1fcedde007a2b90049a7ea438781aebe69e22762/) 

如果你了解ES模块，你就知道你可以多次导入它们，但只能执行一次。 那么这同样适用于HTML中的脚本模块 - 特定URL的模块脚本只能每页执行一次。

### 浏览器问题

+ Edge 多次执行模块

## 始终CORS

```html
<!-- This will not execute, as it fails a CORS check -->
<script type="module" src="https://….now.sh/no-cors"></script>

<!-- This will not execute, as one of its imports fails a CORS check -->
<script type="module">
  import 'https://….now.sh/no-cors';

  addTextToBody("This will not execute.");
</script>

<!-- This will execute as it passes CORS checks -->
<script type="module" src="https://….now.sh/cors"></script>
```

[**Live demo**.](https://cdn.rawgit.com/jakearchibald/2b8d4bc7624ca6a2c7f3c35f6e17fe2d/raw/fe04e60b0b7021f261e79b8ef28b0ccd132c1585/) 

与常规脚本不同，模块脚本通过CORS获取并导入，这意味着跨原始模块脚本必须返回有效的CORS headers，例如`Access-Control-Allow-Origin: *`

### 浏览器问题

+ Firefox 不能加载demo界面
+ Edge 不通过CORS header 加载模块

## 没有凭证

```html
<!-- Fetched with credentials (cookies etc) -->
<script src="1.js"></script>

<!-- Fetched without credentials -->
<script type="module" src="1.js"></script>

<!-- Fetched with credentials -->
<script type="module" crossorigin src="1.js?"></script>

<!-- Fetched without credentials -->
<script type="module" crossorigin src="https://other-origin/1.js"></script>

<!-- Fetched with credentials-->
<script type="module" crossorigin="use-credentials" src="https://other-origin/1.js?"></script>
```

[**Live demo**.](https://module-script-tests-zoelmqooyv.now.sh/cookie-page)

 如果请求是相同的来源，大多数基于CORS的API将发送凭据（Cookie等），但是`fetch()`和模块脚本是例外 - 除非您要求它们，否则它们不会发送凭据。

您可以通过添加`crossorigin`属性（对我来说似乎有点奇怪，而且[我在规范中已经提出质疑](https://github.com/whatwg/html/issues/2557)），可以将相同原始模块的凭据添加到同一起始模块。如果要将凭据发送到其他来源，请使用 `crossorigin="use-credentials"`。请注意，另一个来源必须使用`Access-Control-Allow-Credentials: true`标头进行响应。

另外，还有一个与“模块只执行一次”规则有关的内容。 模块被其URL绑定，因此如果您请求没有凭据的模块，则使用凭据请求它，您将获得相同的无凭证模块。 这就是为什么我在上面的URL中使用了`?`，使它们是唯一的。

### 浏览器问题

+ Chrome在同源请求时具有凭据
+ 即使使用`crossorigin`属性，Safari也会请求没有凭据的同源模块。
+ Edge 正好相反，在默认情况下，它会将凭据发送到相同的原始文件，但是如果添加了`crossorigin`属性，则不会发送它们。

在这个问题上，Firefox 是唯一一个完全没有错误的，well done

## MIME 类型

与常规脚本不同，模块脚本必须使用其中一种[有效的JavaScript MIME类型](https://html.spec.whatwg.org/multipage/scripting.html#javascript-mime-type)，否则它们将不会执行。

[**Live demo**.](https://module-script-tests-zoelmqooyv.now.sh/mime)

### 浏览器问题

+ Edge可以执行使用无效MIME类型的脚本

这就是我迄今为止所学到的东西。 不用说，我很高兴ES模块能在浏览器中使用！