import React from "react";
import style from "./css/container.scss";
import {
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
		AppState.initArticle(this.props.match.params.id)
	}
	componentWillUnmount() {
		hljs.initHighlighting.called = false;
		AppState.init();
	}
	componentWillUpdate(nextProps) {
		hljs.initHighlighting.called = false;
		AppState.initArticle(nextProps.match.params.id)
	}
	handleLike() {
		if (!AppState.likeflag) {
			AppState.handleArticleLike(AppState.article.name)
		}
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
			<header className={style.header}><Link to='/'>所有文章 </Link> > <Link to={categoryLink}>{AppState.article.category}</Link></header>
				<div ref='realdocument'>
				<section className={style.titlesec}> 
				<div className={style.documentinfo}>
				<span className={style.floatleft}>本文作者:Sangle</span><span className={style.floatright}>发布日期:{AppState.article.date}</span>
				</div>
		<h1>{AppState.article.name}</h1>
				</section><section className={style.documentsec}><div className='markdown-body' dangerouslySetInnerHTML={{__html: AppState.articlecontent}}></div>
				</section>
		<div className={style.likebutton} onClick={this.handleLike.bind(this)}><i className={AppState.likeheart} aria-hidden="true"><i className={style.touchpressed}></i></i> <span className={style.floatright}>{AppState.likenumber}</span></div>
				</div>
				<footer onClick={this.handlePrint.bind(this)} className={style.footer}>CLICK HERE TO <strong>PRINT</strong></footer>
			</div>)
	}
}