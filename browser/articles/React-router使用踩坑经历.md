## 安装

> `npm install react-douter-dom`
>
> ```Javascript
> import React from 'react'
> import {BrowserRouter as Router,
>        Route
>        }from 'react-router-dom'
> ```

## 基本组件

## <Router>

基本语法：`<Router><Route /></Router>`

例子：

```JSX
render(<Router history={hashHistory}>
  </Router><Route path='/' component={Sidebar}/>
       </Router>,document.getElementById('app'))
```

参数：`<history>`对象

`<Router>`只能包含一个代码块

> 在服务器环境中:
>
> ```Javascript
> import { Router } from 'react-router'
> import createBrowserHistory from 'history/createBrowserHistory'
>
> const history = createBrowserHistory()
> ```

## <BrowserRouter>

包含HTML5的`history`API

例子：

```JSX
import { BrowserRouter } from 'react-router-dom'

<BrowserRouter
  basename={optionalString}
  forceRefresh={optionalBool}
  getUserConfirmation={optionalFunc}
  keyLength={optionalNumber}
>
  <App/>
</BrowserRouter>
```

参数：

+ basename(可选)：接受一个**字符串** 指向app主页所在的子文件夹

+ getUserConfirmation(可选):接受一个**函数**声明跳转，默认值是`window.comfirm`

+ forceRefresh(可选):若为true则每次跳转都会刷新界面

  > You probably only want this in [browsers that don’t support the HTML5 history API](http://caniuse.com/#feat=history)

+ keyLength(可选):接受一个**数字**，指定`location.key`的长度，默认值为6

## <Route>

参数：根据种类的不同，`<Route>`可以接受不同的参数

+ path:指定路由的匹配规则

例子：

```JSX
render(<Router><div>
    <Route exact path="/" component={Sidebar} />
    <Route path="/articles/:id" component={Article} />
  </div></Router>)
```

`exact`表示完全匹配，而通配符`:id`则表示匹配`/articles/`即可

> ### 通配符
>
> **（1）:id**
>
> `:id`匹配URL的一个部分，直到遇到下一个`/`、`?`、`#`为止。这个路径参数可以通过`this.props.params.id`取出。
>
> **（2）()**
>
> `()`表示URL的这个部分是可选的。
>
> **（3）\***
>
> `*`匹配任意字符，直到模式里面的下一个字符为止。匹配方式是非贪婪模式。
>
> **（4） \****
>
> `**` 匹配任意字符，直到下一个`/`、`?`、`#`为止。匹配方式是贪婪模式。

### Route Render

- Route Component

- Route Render

- Route Children

  **在同一个`<Router>`中只能使用同一类的`<Route>`通常情况下使用Route Component**

### Route props

> All three [render methods](https://reacttraining.com/web/api/Route/route-render-methods) will be passed the same three route props

+ `match`:判断路径是否匹配，含有以下properties

  1. `params` - (object) Key/value pairs parsed from the URL corresponding to the dynamic segments of the path

  2. `isExact` - `true` if the entire URL was matched (no trailing characters)

  3. `path` - (string) The path pattern used to match. Useful for building nested `<Route>`s

  4. `url` - (string) The matched portion of the URL. Useful for building nested `<Link>`s

     **子组件通过`this.props.match`可获得**

+ `location`:表示现在的路径以及目标路径，还包括此前经过的路径

  ```Javascript
  {
    key: 'ac3df4', // not with HashHistory!
    pathname: '/somewhere'
    search: '?some=search-string',
    hash: '#howdy',
    state: {
      [userDefined]: true
    }
  }
  ```

  **子组件通过`this.props.location`可获得**

  > WARNING!   It is also found on `history.location` but you shouldn’t use that because its mutable. 

  `location`对象永不变化，因此可以通过与组件生命周期联系起来从而判断重定向在何时发生

  ```Javascript
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      // navigated!
    }
  }
  ```

  你可以在这些地方用`location`对象取代字符串：

  - Web [Link to](https://reacttraining.com/web/api/Link/to)
  - Native [Link to](https://reacttraining.com/native/api/Link/to)
  - [Redirect to](https://reacttraining.com/web/api/Redirect/to)
  - [history.push](https://reacttraining.com/web/api/history/push)
  - [history.replace](https://reacttraining.com/web/api/history/push)
  - 当你需要根据历史记录(浏览路径)改变显示组件时，需要使用`location`对象,下面是一个例子：

  ```JSX
  // usually all you need
  <Link to="/somewhere"/>

  // but you can use a location instead
  const location = {
    pathname: '/somewhere'
    state: { fromDashboard: true }
  }

  <Link to={location}/>
  <Redirect to={location}/>
  history.push(location)
  history.replace(location)
  ```

  你可以把`location`对象传给以下组件

  - [Route](https://reacttraining.com/web/api/Route/location)
  - [Switch](https://reacttraining.com/web/api/Route/location)

  > This will prevent them from using the actual location in the router’s state. This is useful for animation and pending navigation, or any time you want to trick a component into rendering at a different location than the real one.

+ history

  ---

  **待我有空回来补这段...**



## <Link>

`<Link>`用于指定地址的链接

例子：

```JSX
import {Link} from 'react-router-dom'
<Link to '/about'>About<Link>
```

preview:  <a href="/about">About</a>

参数：

+ to接收一个**字符串**或**对象**

  ```JSX
  <Link to={{
    pathname:'./course hash: '#the-hash',
    state: { fromDashboard: true }                                
  ```

## <Switch>

用于渲染第一个符合路径的`<Route>`或`<Redirect>`组件

>**How is this different than just using a bunch of `<Route>`s?**

 `<Switch>` is unique in that it renders a route *exclusively*. In contrast, every `<Route>` that matches the location renders *inclusively*. Consider this code:

```JSX
import { Switch, Route } from 'react-router'

<Switch>
  <Route exact path="/" component={Home}/>
  <Route path="/about" component={About}/>
  <Route path="/:user" component={User}/>
  <Route component={NoMatch}/>
</Switch>
```

在这个例子中，当我们位于`/about`时，只有`About`组件会渲染，而如果不使用`<Switch>`，`about user Nomatch` 三个都会渲染

## <Redirect>

`<Redirect>`组件用于重定向

例子：

```JSX
import { Route, Redirect } from 'react-router'

<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)}/>
```

参数：

+ to：接受一个**字符串**或**对象*

  ```JSX
  <Redirect to={{
    pathname: '/login',
    search: '?utm=your+face',
    state: { referrer: currentLocation }
  }}/>
  ```

+ push：When `true`, redirecting will push a new entry onto the history instead of replacing the current one.

+ from：接受一个**字符串**