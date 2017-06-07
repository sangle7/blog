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
        AppState.changeAppBar('所有文章 > ' + AppState.article.category)
    }
    componentDidMount() {
        hljs.initHighlighting();
        hljs.initHighlighting.called = false;
    }
    componentDidUpdate() {
        hljs.initHighlighting();
        hljs.initHighlighting.called = false;
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.match.params.id !== nextProps.match.params.id;
    }
    componentWillUnmount() {
        hljs.initHighlighting.called = false;
        AppState.init();
    }
    componentWillUpdate(nextProps) {
        hljs.initHighlighting.called = false;
        AppState.initArticle(nextProps.match.params.id)
        hljs.initHighlighting();
    }
    handleLike() {
        if (!AppState.likeflag) {
            AppState.handleArticleLike(AppState.article.name)
        }
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
				<div className={style.likebutton} onClick={this.handleLike.bind(this)}><i className={AppState.likeheart} aria-hidden="true"><i className={style.touchpressed}></i></i> <span className={style.floatright}>{AppState.likenumber}</span></div>
				</div>
			</div>)
    }
}
