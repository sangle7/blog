import React from "react";
import style from "./css/container.scss";
import {
	documentData
} from './data.js';
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
} from './AppState.js';
import {
	Card,
	CardTitle,
} from 'material-ui/Card';

export default @observer class Articlelist extends React.Component {
	componentWillMount() {
		if (this.props.match.params.cat) {
			AppState.changeAppBar('所有文章 > ' + this.props.match.params.cat)
		}else{
			AppState.changeAppBar('Sangle')
		}
	}
	handleShowMore() {
		AppState.showMoreArticles();
	}
	componentWillUnmount() {
		AppState.init();
	}

	render() {
		let document_, categoryrender;
		if (this.props.match.params.cat) {
			document_ = documentData.filter((elem) => {
				if (elem.category == this.props.match.params.cat)
					return elem
			});
		}

		let documentrender = document_ || documentData;

		documentrender.sort(function(b, a) {
			return parseInt(a.date.replace(/-/g, '')) - parseInt(b.date.replace(/-/g, ''))
		})

		let _temp = documentrender.slice(0, AppState.articleNumber + 10);

		let documents = _temp.map((elem, index) => {
			return <Link to={elem.url} key={index}>
		 <Card style={{'backgroundColor':'#FAFAFA','borderBottom':'1px solid #E0E0E0'}}><CardTitle title={elem.name} subtitle={elem.date} titleStyle={{'fontSize':'auto'}} /></Card></Link>
		})

		return (
			<div>
		<section className={style.section}>
		{documents}
			</section>
			<footer style={{'display':_temp.length==documentrender.length?'none':'block'}}onClick={this.handleShowMore.bind(this)} className={style.footer}>More</footer>
		</div>)
	}
}