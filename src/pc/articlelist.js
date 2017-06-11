import React from "react";
import style from "./css/container.scss";
import {
    documentData
} from './../data/data.js';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import {
    observer
} from 'mobx-react';
import {
    AppState
} from './AppState.js'
export default @observer class Articlelist extends React.Component {
    handleShowMore() {
        AppState.showMoreArticles();
    }
    componentWillUnmount() {
        AppState.init();
    }


    render() {
        let document_, categoryrender;
        let arr = ['编程', '生活']
        let cat = arr.filter((elem) => {
            if (this.props.location.pathname.indexOf(elem) > 0) {
                return elem;
            }
        })
        if (cat[0]) {
            categoryrender = '> ' + cat[0];
            document.title = "Sangle的博客-" + cat[0];
            document_ = documentData.filter((elem) => {
                if (elem.category == cat[0])
                    return elem
            });
        } else {
            document.title = "Sangle的博客"
        }

        let documentrender = document_ || documentData;

        documentrender.sort(function(b, a) {
            return parseInt(a.date.replace(/-/g, '')) - parseInt(b.date.replace(/-/g, ''))
        })

        let _temp = documentrender.slice(0, AppState.articleNumber + 10);

        let documents = _temp.map((elem, index) => {
            return <Link to={elem.url} key={index}>
		<div className={style.main}>
		<div className={style.title}>{elem.name}</div>
		<div className={style.date}><label>发布日期:</label><div>{elem.date}</div></div> </div></Link>
        })


        return (
            <div>
		<header  className={style.header}><Link to='/'>所有文章 </Link>{categoryrender}</header>
		<section className={style.section}>
		{documents}
			</section>
			<footer style={{'display':_temp.length==documentrender.length?'none':'block'}}onClick={this.handleShowMore.bind(this)} className={style.footer}>More</footer>
			</div>
        )
    }
}
