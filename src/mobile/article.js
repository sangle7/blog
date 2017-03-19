import React from "react";
import style from "./css/container.scss";
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import hljs from 'highlight.js';
import {
	AppState
} from './AppState.js';
import {
	observer
} from 'mobx-react';


export default @observer class Article extends React.Component {
	constructor(props) {
		super(props);

	}
	componentWillMount() {
		AppState.initArticle(this.props.match.params.name, this.props.match.params.id)
		AppState.changeAppBar('所有文章 > ' + AppState.article.category)
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
		let categoryLink = '/articles/' + AppState.article.category
		return (
			<div>
				<div ref='realdocument'>
				<section className={style.titlesec}> 
				<div className={style.documentinfo}>
				<span className={style.floatleft}>本文作者:Sangle</span><span className={style.floatright}>发布日期:{AppState.article.date}</span>
				</div>
		<h1>{AppState.article.name}</h1>
				</section><section className={style.documentsec}><div className='markdown-body' dangerouslySetInnerHTML={{__html: AppState.articlecontent}}></div>
				</section>
				</div>
			</div>)
	}
}