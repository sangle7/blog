import React from "react";
// import style from "./css/sidebar.scss"
import {
    observer
} from 'mobx-react';
import {
    AppState
} from './AppState.js';
import {
    Link
} from 'react-router-dom';

export default @observer class Sidebar extends React.Component {
    handleHoverWC() {
        AppState.showWechatImg();
    }
    handleOut() {
        AppState.hideWechatImg();
    }
    backToTopQuick() {
        document.body.scrollTop = 0;
    }
    handleColorNormal(e) {
        e.nativeEvent.target.style.color = 'grey'
    }
    handleHover(e) {
        e.nativeEvent.target.style.color = AppState.colorStyle.mainColor
    }
    render() {
        let recommendData = AppState.documentData.slice().filter((elem) => {
            return elem.recommand
        })
        let recommand = recommendData.map((elem, index) => {
            return <li onMouseOver={this.handleHover.bind(this)} onMouseOut={this.handleColorNormal.bind(this)} key={index} onClick={this.backToTopQuick.bind(this)}><Link to={elem.url}>{elem.name}</Link></li>
        })


        return (<div className={style.sidebar}>
		<div className={style.personalinfo}>
			<img src={require('./../img/info.jpg')}className={style.infopic}/>
			<p>Sangle</p>
			</div>
			<address className={style.address}>
		<div className={style.infoline}>
				<div>
				<i style={{'color':AppState.colorStyle.mainColor}} className="fa fa-github" aria-hidden="true"></i>
				<a href="https://github.com/sangle7"> Sangle7</a>
				</div>
				<div>
				<i style={{'color':AppState.colorStyle.mainColor}} className="fa fa-weibo" aria-hidden="true"></i>
				<a href="http://weibo.com/523374254"> 4ever_Sangle</a>
				</div>
			</div>
			<div className={style.infoline}>
				<div>
				<i style={{'color':AppState.colorStyle.mainColor}} className="fa fa-weixin" aria-hidden="true"></i>
				<a onMouseOver={this.handleHoverWC.bind(this)} onMouseOut={this.handleOut.bind(this)} href="#"> Sangle</a>
				<img style={{'display':AppState.wechat}}  className={style.wechaticon} src={require('./../img/wechati.jpg')} height="150" width="150"/>
				</div>
				<div>
				<i style={{'color':AppState.colorStyle.mainColor}} className="fa fa-envelope-o" aria-hidden="true"></i>
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
