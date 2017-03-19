import React from "react";
import style from './css/navbar.scss';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';

export default class Navbar extends React.Component {
	render() {
		return (<div className={style.title}>
		<ul className={style.ul}>
		<li className={style.logo}><Link to='/'>Sangle</Link></li>
		<li><Link to='/articles/编程'>编程</Link></li>
		<li><Link to='/articles/生活'>生活</Link></li>
		<li><Link to='/music'>音乐</Link></li>
		<li><Link to='/tools'>工具</Link></li>
		<li><Link to='/aboutme'>关于我</Link></li>
			</ul>
		</div>)
	}
}