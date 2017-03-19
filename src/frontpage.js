import React from "react";
import Navbar from "./navbar.js";
import Mainbody from "./mainbody.js";
import './css/global.scss';

export default class Frontpage extends React.Component {
	render() {
		return (<div><Navbar /><Mainbody/></div>)
	}
}