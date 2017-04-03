import React from "react";
import ReactDOM from "react-dom";
import Frontpage from "./frontpage.js"
import {
	Route,Switch
} from 'react-router-dom';
import {
	BrowserRouter as Router
} from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();


ReactDOM.render(
  <MuiThemeProvider>
	<Router>
	<div>
		<Route  exact path='/' component={Frontpage}/>
		<Route  path='/mobile' component={Frontpage}/>
		<Route  path='/articles/编程/:art' component={Frontpage}/>
		<Route  path='/articles/编程' component={Frontpage}/>
		<Route  path='/articles/生活/:art' component={Frontpage}/>
		<Route  path='/articles/生活' component={Frontpage}/>
		<Route  path='/music' component={Frontpage}/>
		<Route  path='/aboutme' component={Frontpage}/></div>
		</Router>
  </MuiThemeProvider>, document.getElementById('root'))
