import React from "react";
import ReactDOM from "react-dom";
import './css/global.scss';
import style from './css/navbar.scss';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch
} from 'react-router-dom';
import Sidebar from "./sidebar.js";
import TOCbar from "./TOCbar.js";
import styleB from "./css/container.scss";
import Articlelist from "./articlelist.js";
import Article from "./Article"
import Musicplayer from "./Musicplayer"
import MarkdownEditor from "./MarkdownEditor"
import Aboutme from "./Aboutme";
import {
	AppState
} from './AppState.js';
import {
	observer
} from 'mobx-react';

/*
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
const MarkdownEditor = asyncComponent(() =>
  System.import('./MarkdownEditor').then(module => module.default)
)
const Aboutme = asyncComponent(() =>
  System.import('./Aboutme').then(module => module.default)
)
const Article = asyncComponent(() =>
  System.import('./Article').then(module => module.default)
)*/

@observer class Frontpage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display: 'none'
		}
	}
	componentDidMount() {
		// loadMusicplayer(() => {})
		window.onscroll = () => {
			if (window.scrollY > document.body.clientHeight) {
				this.setState({
					display: 'block'
				})
			} else {
				this.setState({
					display: 'none'
				})
			}
		}
	}
	handleRouteChange() {
		document.body.scrollTop = 0;
		this.refs.loading.style.opacity='1';
		setTimeout(()=>{
			this.refs.loading.style.opacity='0';
		},2000)
	}
	backtotop() {
		var timer = null;
		cancelAnimationFrame(timer);
		timer = requestAnimationFrame(function fn() {
			var oTop = document.body.scrollTop || document.documentElement.scrollTop;
			if (oTop > 0) {
				document.body.scrollTop = document.documentElement.scrollTop = oTop - 200;
				timer = requestAnimationFrame(fn);
			} else {
				cancelAnimationFrame(timer);
			}
		})
	}

	changeMainColor() {

		let _cover = this.refs.cover;
		let i = 35;
		_cover.style.left = null;
		_cover.style.top = null;
		_cover.style.borderColor = null;
		_cover.style.borderTopColor = null;
		_cover.style.borderLeftColor = null;
		_cover.style.display = 'block';
		var timer = setInterval(() => {
			i += 10;
			_cover.style.borderWidth = i + 'px'
			if (i >= document.body.clientWidth) {
				nnn()
				clearInterval(timer)
			}
		}, 5)

		function nnn() {
			_cover.style.top = 0;
			_cover.style.left = 0;
			_cover.style.borderColor = 'transparent';
			_cover.style.borderTopColor = AppState.colorStyle.mainColor;
			_cover.style.borderLeftColor = AppState.colorStyle.mainColor;
			var timer2 = setInterval(() => {
				i -= 10;
				_cover.style.borderWidth = i + 'px';
				if (i <= 0) {
					_cover.style.displey = 'none';
					clearInterval(timer2)
				}
			}, 5)
		}
		AppState.changeMainColor();
	}

	handleColorDark(e) {
		e.nativeEvent.target.style.background = AppState.colorStyle.darkColor
	}

	handleColorMain(e) {
		e.nativeEvent.target.style.background = AppState.colorStyle.mainColor
	}

	handleTransparent(e){
		e.nativeEvent.target.style.background = 'transparent'
	}

	handleBTPColorMain(e) {
		this.refs.backToTop.style.background = AppState.colorStyle.mainColor
	}
	handleBTPColorLight(e) {
		this.refs.backToTop.style.background = AppState.colorStyle.lightColor
	}

	render() {
		let navlist = [{
			'link': '/articles/编程',
			'name': '编程'
		}, {
			'link': '/articles/生活',
			'name': '生活'
		}, {
			'link': '/music',
			'name': '音乐'
		}, {
			'link': '/tools',
			'name': '工具'
		}, {
			'link': '/aboutme',
			'name': '关于我'
		}].map((elem, index) => {
			return <Link to={elem.link} key={index} ><li onMouseOver={this.handleColorDark.bind(this)} onMouseOut={this.handleTransparent.bind(this)}>{elem.name}</li></Link>
		})
		return (<Router>
			<div>
			<div className={style.title} style={{'background':AppState.colorStyle.mainColor}}>
		<ul className={style.ul}>
		<li className={style.logo}><Link to='/'>Sangle</Link></li>
		{navlist}
		<a href="http://notes.sangle7.com" target="_blank"><li style={{'float':'right'}}><i className="fa fa-pencil-square" aria-hidden="true"></i> Scratch</li></a>
			</ul>
		<Route path="/articles/编程/:id" component={TOCbar}/>
		<Route path="/articles/生活/:id" component={TOCbar}/>
		</div>

		<div id="mainbody" style={{'transform':AppState.mainbodyTransform}} className={style.mainbody}>

		<Sidebar />
		<div className={styleB.container}>

	
         
         <Switch>
		<Route exact path='/' component={Articlelist}/>
		<Route exact path="/articles/编程" component={Articlelist}/>
		<Route exact path="/articles/生活" component={Articlelist}/>
		<Route  path="/articles/编程/:id" component={Article}/>
		<Route  path="/articles/生活/:id" component={Article}/>
		<Route exact path="/music" component={Musicplayer}/>
		<Route exact path="/tools" component={MarkdownEditor}/>
		<Route  exact path="/aboutme" component={Aboutme}/>
		 </Switch>

		</div>
		</div>
		<div ref='backToTop' onMouseOver={this.handleBTPColorMain.bind(this)} onMouseOut={this.handleBTPColorLight.bind(this)} onClick={this.backtotop.bind(this)} style={{'display':this.state.display,'background':AppState.colorStyle.lightColor}} className={styleB.FloatingButton}><i className="fa fa-angle-double-up" aria-hidden="true"></i></div>
		<div ref='uncoverFlip' onClick={this.changeMainColor.bind(this)} className={AppState.uncoverClass}><div></div></div>
		<div ref="cover" className={AppState.coverClass}></div>
		</div>
		</Router>)
	}
}

ReactDOM.render(<Frontpage />, document.getElementById('root'))