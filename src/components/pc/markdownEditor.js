import React from "react";
import style from "./css/markdowneditor.scss";
import hljs from 'highlight.js';
import {
    AppState
} from './AppState.js';
import {
    observer
} from 'mobx-react';

export default @observer class MarkdownEditor extends React.Component {
    componentWillMount() {
        document.title = "Sangle的博客-Markdown编辑器";
    }
    md2html() {
        AppState.MDtoHTML(this.refs.markdown.value);
    }
    handlePrint() {
        let newstr = this.refs.realdocument.innerHTML;
        let oldstr = document.body.innerHTML;
        document.body.innerHTML = newstr;
        window.print();
        document.body.innerHTML = oldstr;
        return false;
    }
    componentDidUpdate() {
        hljs.initHighlighting()
    }
    componentWillUnmount() {
        AppState.init();
    }
    render() {
        return (
            <div>
			<header  className={style.header}>Markdown编辑器</header>
		<section className={style.section}>
		<textarea ref="markdown"  defaultValue="# Markdown Here!"  className={style.input} /> 
		<button onClick={this.md2html.bind(this)} className={style.trans} style={{'background':AppState.colorStyle.lightColor}}>TO HTML</button>
			</section>
			<section ref='realdocument' className={style.documentsec}>
			<div className="markdown-body" dangerouslySetInnerHTML={{__html: AppState.mdcontent}}>
			</div>
			</section>
			<footer onClick={this.handlePrint.bind(this)} className={style.footer}>CLICK HERE TO <strong>PRINT</strong></footer>
		</div>)
    }
}
