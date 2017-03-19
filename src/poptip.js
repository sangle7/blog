import React from "react";
import style from "./css/poptip.scss";
import {
	AppState
} from './AppState.js';
import {
	observer
} from 'mobx-react';

export default @observer class Poptip extends React.Component {
	constructor(props) {
		super(props);
	}
	handleClick(e) {
		e.nativeEvent.stopImmediatePropagation();
	}
	componentDidMount() {
		document.onclick = () => {
			AppState.hidePoptip()
		};
	}
	handleSubmit(e) {
		let [a, b, c] = [this.refs.songname.value,
			this.refs.songalbum.value, this.refs.songartist.value
		]
		AppState.poptipSubmit(a, b, c)
	}

	render() {
		return (<form onClick={this.handleClick.bind(this)} style={{'display':AppState.poptipstyle}} className={style.main} onSubmit={this.handleSubmit.bind(this)} encType = "text/plain">
			<div style={{'display':AppState.poptipsubmit?'block':'none'}}className={style.submit}>提交成功！</div>
                <label>歌名: <input ref='songname' name="songname" type="text" /></label>
                 <label>专辑: <input ref='songalbum' name="songalbum" type="text" /></label>
                 <label>歌手: <input ref='songartist' name="songartist" type="text" /></label>
		<button className={style.submitbutton} type = "button" onClick={this.handleSubmit.bind(this)}>提交</button> </form >)
	}
}