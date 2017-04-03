import React from "react";
import ReactDOM from "react-dom";
import Frontpage from "./frontpage.js"
import {
	BrowserRouter as Router,
	Route
} from 'react-router-dom';

ReactDOM.render(<Router>
	<div>
		<Route  exact path='/' component={Frontpage}/>
		<Route  path='/pc' component={Frontpage}/>
		<Route  path='/articles/编程' component={Frontpage}/>
		<Route  path='/articles/生活' component={Frontpage}/>
		<Route  path='/music' component={Frontpage}/>
		<Route  path='/tools' component={Frontpage}/>
		<Route  path='/aboutme' component={Frontpage}/>
		</div>
		</Router>, document.getElementById('root'))
