import React from "react";
import './css/global.scss';
import style from './css/navbar.scss';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import {
	Switch
} from 'react-router';
import Sidebar from "./sidebar.js";
import styleB from "./css/container.scss";
import Articlelist from "./articlelist.js";
import Article from './article.js';
import Musicplayer from './Musicplayer.js'
import MarkdownEditor from './markdownEditor.js';
import Aboutme from "./aboutme.js"

export default class Frontpage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display: 'none'
		}
	}
	componentDidMount() {
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
	backToTopQuick() {
		document.body.scrollTop = 0;
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

	render() {
		return (<Router>
			<div>
			<div className={style.title}>
		<ul className={style.ul}>
		<li className={style.logo}><Link to='/' onClick={this.backToTopQuick.bind(this)}>Sangle</Link></li>
		<Link to='/articles/编程' onClick={this.backToTopQuick.bind(this)}><li>编程</li></Link>
		<Link to='/articles/生活' onClick={this.backToTopQuick.bind(this)}><li>生活</li></Link>
		<Link to='/music' onClick={this.backToTopQuick.bind(this)}><li>音乐</li></Link>
		<Link to='/tools' onClick={this.backToTopQuick.bind(this)}><li>工具</li></Link>
		<Link to='/aboutme' onClick={this.backToTopQuick.bind(this)}><li>关于我</li></Link>
			</ul>
		</div><div className={style.mainbody}>
		<Sidebar />
		<div className={styleB.container}>
		<Switch>
		<Route exact path='/' component={Articlelist}/>
		<Route path='/pc' component={Articlelist}/>
		<Route exact path="/articles/编程" component={Articlelist}/>
		<Route exact path="/articles/生活" component={Articlelist}/>
		<Route path="/articles/编程/:id" component={Article}/>
		<Route path="/articles/生活/:id" component={Article}/>
		<Route path="/music" component={Musicplayer}/>
		<Route path="/tools" component={MarkdownEditor}/>
		<Route path="/aboutme" component={Aboutme}/>
		</Switch>
		</div>
		<div onClick={this.backtotop.bind(this)} style={{'display':this.state.display}}className={styleB.FloatingButton}><i className="fa fa-angle-double-up" aria-hidden="true"></i></div>
		</div>
		</div>
		</Router>)
	}
}