import React from "react";
import style from "./css/container.scss";
import Articlelist from "./articlelist.js";
import {
	Switch,
	Route
} from 'react-router';
import {
	BrowserRouter as Router
} from 'react-router-dom'
import Article from './article.js'
import Musicplayer from './Musicplayer.js'
import MarkdownEditor from './markdownEditor.js';
import Aboutme from "./aboutme.js"

export default class Container extends React.Component {

	render() {
		return (
			<div className={style.container}>
			<Router>
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
		</Router>
		</div>)
	}
}