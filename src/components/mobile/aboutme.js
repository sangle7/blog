import React from "react";
import style from "./css/container.scss";
import {
	observer
} from 'mobx-react';
import {
	AppState
} from './AppState.js'
import hljs from 'highlight.js'

export default @observer class Aboutme extends React.Component {
	componentWillMount() {
		AppState.changeAppBar('关于我')
		AppState.changeAriticle("../articles/aboutme.md")
	}
	componentWillUnmount() {
		hljs.initHighlighting.called = false;
		AppState.init();
	}
	handlePrint() {
		let newstr = this.refs.realdocument.innerHTML;
		let oldstr = document.body.innerHTML;
		document.body.innerHTML = newstr;
		window.print();
		document.body.innerHTML = oldstr;
		return false;
	}
	render() {
		return (
			<div>
				<div ref='realdocument'>
				<section className={style.titlesec}> 
				<div className={style.documentinfo}>
				<span className={style.floatleft}>本文作者:Sangle</span>
				</div>
		<h1>我的博客</h1>
				</section><section className={style.documentsec}><div className='markdown-body' dangerouslySetInnerHTML={{__html: AppState.articlecontent}}></div>
				</section>
				</div>
			</div>)
	}
}