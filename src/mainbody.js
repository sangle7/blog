import React from "react";
import Sidebar from "./sidebar.js";
import Container from "./container.js";
import style from "./css/mainbody.scss";


export default class Mainbody extends React.Component {

	render() {
		return (<div className={style.mainbody}><Sidebar /><Container/></div>)
	}
}