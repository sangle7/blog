 import React from "react";
 import style from "./css/TOCbar.scss";
 import {
     observer
 } from 'mobx-react';
 import {
     AppState
 } from './AppState.js';

 export default @observer class TOCbar extends React.Component {
     handleColorLight(e) {
         this.refs.TOCcontroller.style.background = AppState.colorStyle.lightColor
     }

     handleColorMain(e) {
         this.refs.TOCcontroller.style.background = AppState.colorStyle.mainColor
     }

     showOrHideTOC() {
         AppState.showOrHideTOC();
     }
     render() {
         return (<div>
          <div ref='TOCcontroller' key='0' onMouseOver={this.handleColorMain.bind(this)} onMouseOut={this.handleColorLight.bind(this)} style={{'transform':AppState.TOCCTransfrom,'background':AppState.colorStyle.lightColor}} className={style.TOCcontroller} onClick={this.showOrHideTOC.bind(this)}><i className={AppState.TOCcontroller} aria-hidden="true"></i></div>
 			<div className={style.TOC} id='TOC' style={{'transform':AppState.TOCTransfrom}}>
 			<p className={style.menu}>Table Of Content</p>
 			<div id="category" dangerouslySetInnerHTML={{__html: AppState.TOCinnerHTML}}></div>
 			</div></div>)
     }
 }
