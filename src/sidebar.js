import React from "react";
import style from "./css/sidebar.scss"
import {
	recommendData
} from './data.js';
import {
	observer
} from 'mobx-react';
import {
	AppState
} from './AppState.js';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';

export default @observer class Sidebar extends React.Component {
	handleHover() {
		AppState.showWechatImg();
	}
	handleOut() {
		AppState.hideWechatImg();
	}
	render() {
		let recommand = recommendData.map((elem, index) => {
			return <li key={index}><Link to={elem.url}>{elem.name}</Link></li>
		})


		return (<div className={style.sidebar}>
		<div className={style.personalinfo}>
			<img src={require('./img/info.jpg')}className={style.infopic}/>
			<p>Sangle</p>
			</div>
			<address className={style.address}>
		<div className={style.infoline}>
				<div>
				<i className="fa fa-github" aria-hidden="true"></i>
				<a href="https://github.com/sangle7"> Sangle7</a>
				</div>
				<div>
				<i className="fa fa-weibo" aria-hidden="true"></i>
				<a href="http://weibo.com/523374254"> 4ever_Sangle</a>
				</div>
			</div>
			<div className={style.infoline}>
				<div>
				<i className="fa fa-weixin" aria-hidden="true"></i>
				<a onMouseOver={this.handleHover.bind(this)} onMouseOut={this.handleOut.bind(this)} href="#"> Sangle</a>
				<img style={{'display':AppState.wechat}}  className={style.wechaticon} src={require('./img/wechati.jpg')} height="150" width="150"/>
				</div>
				<div>
				<i className="fa fa-envelope-o" aria-hidden="true"></i>
				<a href="mailto:whb97@163.com"> SangleWang</a>
				</div>
			</div>
			</address>
		<div className={style.recommandlist}>
		<h1>推荐阅读:</h1>
		<ul>
		{recommand}
		</ul>
		</div>
		</div>)
	}
}