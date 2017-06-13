找了一圈没能看到令人满意的详细教程，所以自己来总结一下在实现按需加载中踩过的坑

**源代码**

```JSX
import React from "react";
import {
	BrowserRouter as Router,
	Route,
} from 'react-router-dom';
import Musicplayer from "./Musicplayer";

class Frontpage extends React.Component {
  render(){
    return(
    <Router>
		<Route exact path='/' component={Articlelist}/>
		<Route path="/music" component={Musicplayer}/>
      </Router>
    )
  }
}
```

**实现目标**

按需加载，根据不同路径载入不同的js文件，即当打开主页面时加载bundle.js，在打开/music页面时再加载musicplayer.js。

## require.ensure

不清楚require.ensure怎么用的可以看[webpack2 文档](http://www.css88.com/doc/webpack2/guides/code-splitting-require/)。

> webpack 在编译时，会静态地解析代码中的 `require.ensure()`，同时将模块添加到一个分开的 chunk 当中。这个新的 chunk 会被 webpack 通过 `jsonp` 来按需加载。

所以我尝试把代码变成这样...

```JSX
import React from "react";
import {
	BrowserRouter as Router,
	Route,
} from 'react-router-dom';


class Frontpage extends React.Component {
  getComponent(nextState,cb){
        require.ensure([],(require)=>{
            return cb(null,require('./Musicplayer')).default
        })
    }
  render(){
    return(
    <Router>
		<Route exact path='/' component={Articlelist}/>
		<Route path="/music" getComponent={Musicplayer}/>
      </Router>
    )
  }
}
```

当然它理所应当的失败了=-=，因为getComponent这个Api在v4中已经没有了。

在这里我要吐槽一发react-router，API变得比翻书还快（微笑）

于是我只好找回了官方文档。

## bundle-loader

官方文档上刚好有一栏是 [Code Splitting](https://reacttraining.com/react-router/web/guides/code-splitting)，使用bundle-loader完成代码分割。

> 为什么使用bundle-loader？
>
> 官方的解释是：一个采用bundle-loader的巨大优点是它的第二次（及之后）回调是同步的，这样你在访问含有分割代码的界面时就不会每次都看到闪屏（只有第一次有）。

官方也给了一个demo，装上bundle-loader配置一下webpack就能用了，看起来一切都很完美。

然而当我按照官方demo运行时却报错了！提示bundle.js中的render格式错误。

让我们来看看bundle.js（从官方文档复制的）

```JSX
import React, { Component } from 'react'

export default class Bundle extends Component {
  state = {
    mod: null
  }

  componentWillMount() {
    this.load(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }

  load(props) {
    this.setState({
      mod: null
    })
    props.load((mod) => {
      this.setState({
        mod: mod.default ? mod.default : mod
      })
    })
  }

  render() {
    return this.props.children(this.state.mod)
  }
}
```

...........我能怎么办我也很绝望啊.jpg

## An Easy Way

最后我google了一番，几经波折后采用了下面这个简单的办法

```JSX
import React from "react";
import {
	BrowserRouter as Router,
	Route,
} from 'react-router-dom';
 
function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };
    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }
    render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
}

const Musicplayer = asyncComponent(() =>
  System.import('./Musicplayer').then(module => module.default)
)

class Frontpage extends React.Component {
  render(){
    return(
    <Router>
		<Route exact path='/' component={Articlelist}/>
		<Route path="/music" component={Musicplayer}/>
      </Router>
    )
  }
}
```

于是这样就完成了，其实逻辑和上一个没太大差别不过写法简单了很多+解决了render报错的问题