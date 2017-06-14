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
        return (<form onClick={this.handleClick.bind(this)} style={{'display':AppState.poptipstyle,'background':AppState.colorStyle.mainColor}} className={style.main} onSubmit={this.handleSubmit.bind(this)} encType = "text/plain">
			<div style={{'display':AppState.poptipsubmit?'block':'none','color':AppState.colorStyle.lightColor}}className={style.submit}>提交成功
！</div>
                <label>Song / 歌名: <input style={{'color':AppState.colorStyle.darkColor}} ref='songname' name="songname" type="text" /></label>
                 <label>Album / 专辑: <input style={{'color':AppState.colorStyle.darkColor}} ref='songalbum' name="songalbum" type="text" /></label>
                 <label>Artist / 歌手: <input style={{'color':AppState.colorStyle.darkColor}} ref='songartist' name="songartist" type="text" /></label>
		<button className={style.submitbutton} style={{'color':AppState.colorStyle.mainColor}} type = "button" onClick={this.handleSubmit.bind(this)}>提交</button> </form>)
    }
}
