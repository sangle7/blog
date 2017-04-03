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
import Aboutme from "./aboutme.js";

export default class Container extends React.Component {

	render() {
		return (
			<div className={style.container}>
			<Router>
		<Switch>
		<Route exact path='/' component={Articlelist}/>
		<Route path='/mobile' component={Articlelist}/>
		<Route path="/articles/:name/:id" component={Article}/>
		<Route path="/articles/:cat" component={Articlelist}/>
		<Route path="/music" component={Musicplayer}/>
		<Route path="/aboutme" component={Aboutme}/>
		</Switch>
		</Router>
		</div>)
	}
}