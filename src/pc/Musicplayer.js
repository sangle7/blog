import React from "react";
import style from "./css/musicplayer.scss";
import {
	musicData
} from './../data/data.js';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import Playlist from './playlist.js';
import Poptip from './poptip.js';
import {
	AppState
} from './AppState.js';
import {
	observer
} from 'mobx-react';


export default @observer class Musicplayer extends React.Component {
	componentDidMount() {
		this.interval = AppState.musicPlaying(this.refs.audio)
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	nextSong() {
		AppState.nextSong();
	}

	playFromHere(event) {
		let audio = this.refs.audio;
		this.refs.green.style.width = event.nativeEvent.offsetX + 'px';
		audio.currentTime = Math.round(event.nativeEvent.offsetX / 430 * audio.duration);
	}

	pause(event) {
		let audio = this.refs.audio;
		AppState.changePlayAndPause();
		if (audio.paused) {
			audio.play();
		} else if (audio.ended) {
			audio.load();
		} else {
			audio.pause();
		}
	}

	sentMeMail(e) {
		e.nativeEvent.stopImmediatePropagation();
		AppState.showPoptip();
	}

	render() {
		return (
			<div>
		<header className={style.header}>歌单<p>CLICK <span onClick={this.sentMeMail.bind(this)}>HERE</span> TO RECOMMAND SONGS TO ME!</p></header>
		<Poptip />
			<div className={style.mainplayer}>
        <h1>{musicData[AppState.playing].name}</h1>
        <h2>{musicData[AppState.playing].artist}</h2>
        <div className={style.control}>
            <h5>{AppState.playtime}</h5>
            <div className={style.playVolume}><i className="fa fa-volume-up" aria-hidden="true"></i>
                <div className={style.volumerange}>
                    <div></div>
                    <div className={style.red}></div>
                </div>
            </div>
            <div className={style.playline}  onClick={this.playFromHere.bind(this)}>
		<div ref='green' style={{'width':AppState.timelinewidth}}></div>
            </div>
        </div>
        <div className={style.icons}><i className="fa fa-heart" aria-hidden="true"></i><i onClick={this.nextSong.bind(this)} className="fa fa-step-forward" aria-hidden="true"></i><i onClick={this.pause.bind(this)} ref='pauseandplay' className={AppState.pauseandplay} aria-hidden="true"></i></div>
        <audio ref='audio' src={musicData[AppState.playing].url} autoPlay="autoplay">
        </audio>
        <img src={musicData[AppState.playing].cover} height="250" width="250" />
    </div>
    <Playlist/>
			</div>)
	}
}