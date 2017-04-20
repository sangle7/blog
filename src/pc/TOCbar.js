 import React from "react";
 import style from "./css/TOCbar.scss";
 import {
 	observer
 } from 'mobx-react';
 import {
 	AppState
 } from './AppState.js';

 export default @observer class TOCbar extends React.Component {

 	showOrHideTOC() {
 		AppState.showOrHideTOC();
 	}
 	render() {
 		return (<div>
          <div ref='TOCcontroller' key='0' style={{'transform':AppState.TOCCTransfrom}} className={style.TOCcontroller} onClick={this.showOrHideTOC.bind(this)}><i className={AppState.TOCcontroller} aria-hidden="true"></i></div>
 			<div className={style.TOC} id='TOC' style={{'transform':AppState.TOCTransfrom}}>
 			<p className={style.menu}>Table Of Content</p>
 			<div id="category" dangerouslySetInnerHTML={{__html: AppState.TOCinnerHTML}}></div>
 			</div></div>)
 	}
 }