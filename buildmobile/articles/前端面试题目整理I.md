### http状态码有那些？分别代表是什么意思？[](https://simplyy.space/article/56d8377063fac2a8175b41f4#http状态码有那些？分别代表是什么意思？)

- 1**(信息类)：表示接收到请求并且继续处理
  - 100 Continue 继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息
- 2**(响应成功)：表示动作被成功接收、理解和接受
  - 200 OK 正常返回信息
  - 201 Created 请求成功并且服务器创建了新的资源
  - 202 Accepted 服务器已接受请求，但尚未处理
- 3**(重定向类)：为了完成指定的动作，必须接受进一步处理
  - 301 Moved Permanently 请求的网页已永久移动到新位置。
  - 302 Found 临时性重定向。
  - 303 See Other 临时性重定向，且总是使用 GET 请求新的 URI。
  - 304 Not Modified 自从上次请求后，请求的网页未修改过。
- 4**(客户端错误类)：请求包含错误语法或不能正确执行
  - 401 Unauthorized 请求未授权验证。
  - 403 Forbidden 禁止访问。
  - 404 Not Found 找不到如何与 URI 相匹配的资源。
- 5**(服务端错误类)：服务器不能正确执行一个正确的请求
  - 500 Internal Server Error 服务器遇到错误，最常见的服务器端错误。
  - 503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。

### WEB应用从服务器主动推送Data到客户端有那些方式？[](https://simplyy.space/article/56d8377063fac2a8175b41f4#WEB应用从服务器主动推送Data到客户端有那些方式？)

- html5提供的Websocket
- ajax 长时间连接
- ajax 长轮询

### 介绍一下 cookie、localStorage、sessionStorage[](https://simplyy.space/article/56d8377063fac2a8175b41f4#介绍一下 cookie、localStorage、sessionStorage)

#### Cookie[](https://simplyy.space/article/56d8377063fac2a8175b41f4#Cookie)

Cookie 是小甜饼的意思。顾名思义，cookie 确实非常小，它的大小限制为4KB左右。它的主要用途有保存登录信息，比如你登录某个网站市场可以看到“记住密码”，这通常就是通过在 Cookie 中存入一段辨别用户身份的数据来实现的。

一般由服务器生成，可设置失效时间。如果在浏览器端生成Cookie，默认是关闭浏览器后失效。**每次** 都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题（每一次的 http 请求的大小都会加上 cookie 的大小）,所以Cookie 当然是能精简就精简

#### localStorage[](https://simplyy.space/article/56d8377063fac2a8175b41f4#localStorage)

localStorage 是 HTML5 标准中新加入的技术, 用于本地存储, 仅在客户端（即浏览器）中保存，不参与和服务器的通信。

曾经还使用 Cookie 来保存用户在电商网站的购物车信息，如今有了 localStorage，似乎在这个方面也可以给 Cookie 放个假了。HTML5游戏也非常适合使用。

#### sessionStorage[](https://simplyy.space/article/56d8377063fac2a8175b41f4#sessionStorage)

sessionStorage 与 localStorage 的接口类似，但保存数据的生命周期与 localStorage 不同它只是可以将一部分数据在当前会话中保存下来，刷新页面数据依旧存在。但当 **页面关闭** 后，sessionStorage 中的数据就会被清空。

如果遇到一些内容特别多的表单，为了优化用户体验，我们可能要把表单页面拆分成多个子页面，然后按步骤引导用户填写。这时候 sessionStorage 的作用就发挥出来了。

![优化](http://images.cnitblog.com/blog/275014/201308/17194803-cbaa54f624bb4d529ddddaba7f7cf3df.png)



![数据库对比](http://img.bbs.csdn.net/upload/201409/15/1410763091_874088.png)



### 问：说一下你了解的http报头有哪些？

答：cache-control；if-Match，检测Etag的；if-modified-since（我当时这个只是答到了它的作用，没答出名字）。然后说不知道了，（可突然想起了跨域的那个），就说有一个是跨域的。

**TCP的可靠性如何保证：**

在TCP的连接中，数据流必须以正确的顺序送达对方。TCP的可靠性是通过顺序编号和确认（ACK）来实现的。TCP在开始传送一个段时，为准备重传而首先将该段插入到发送队列之中，同时启动时钟。其后，如果收到了接受端对该段的ACK信息，就将该段从队列中删去。如果在时钟规定的时间内，ACK未返回，那么就从发送队列中再次送出这个段。TCP在协议中就对数据可靠传输做了保障，握手与断开都需要通讯双方确认，数据传输也需要双方确认成功，在协议中还规定了：分包、重组、重传等规则；而UDP主要是面向不可靠连接的，不能保证数据正确到达目的地。