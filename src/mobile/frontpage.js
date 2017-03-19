import React from "react";
import Navbar from "./navbar.js";
import Container from "./container.js";
import './css/global.scss';

export default class Frontpage extends React.Component {
	render() {
		return (<div><Navbar /><Container/></div>)
	}
}