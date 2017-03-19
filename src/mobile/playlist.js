import React from "react";
import style from "./css/container.scss";
import {
	musicData
} from './data.js';
import {
	observer
} from 'mobx-react';
import {
	AppState
} from './AppState.js';
import {
	Card,
	CardHeader,
} from 'material-ui/Card';


export default @observer class Articlelist extends React.Component {
	constructor(props) {
		super(props);
	}
	handleMusicChange(i) {
		AppState.changePlaying(i);
	}
	handleShowMore() {
		AppState.showMoreMusics();
	}
	componentWillUnmount() {
		AppState.init();
	}
	render() {
		let _temp = musicData.slice(0, AppState.musicNumber + 10);

		let playlist = _temp.map((elem, index) => {
			return (<Card onClick={this.handleMusicChange.bind(this,index)} key={index}>
				 <CardHeader title={elem.name} subtitle={elem.artist}/>
		</Card>)
		})

		return (
			<div>
		<section className={style.section}>
		{playlist}
			</section>
			<footer style={{'display':_temp.length==musicData.length?'none':'block'}}onClick={this.handleShowMore.bind(this)} className={style.footer}>More</footer>
		</div>)
	}
}