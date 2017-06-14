import React from "react";
import style from "./css/musicplayer.scss";
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
    componentWillMount() {
        document.title = "Sangle的博客-音乐";
        AppState.initSongsPHP()
    }
    componentDidMount() {
        this.interval = AppState.musicPlaying(this.refs.audio)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        AppState.init()
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
        let playing = AppState.musicData[AppState.playing] || {
            name: '歌曲名称',
            url: '',
            artist: '歌手',
            cover: ''
        }
        return (
            <div>
		<header className={style.header}>歌单<p>CLICK <span onClick={this.sentMeMail.bind(this)} style={{'color':AppState.colorStyle.mainColor}}>HERE</span> TO RECOMMAND SONGS TO ME!</p></header>
		<Poptip />
			<div className={style.mainplayer}>
        <h1>{playing.name}</h1>
        <h2>{playing.artist}</h2>
        <div className={style.control}>
            <h5>{AppState.playtime}</h5>
            <div className={style.playVolume}><i className="fa fa-volume-up" aria-hidden="true"></i>
                <div className={style.volumerange}>
                    <div></div>
                    <div className={style.red}></div>
                </div>
            </div>
            <div className={style.playline}  onClick={this.playFromHere.bind(this)}>
		<div ref='green' style={{'width':AppState.timelinewidth,'background':AppState.colorStyle.mainColor}}></div>
            </div>
        </div>
        <div className={style.icons}><i className="fa fa-heart" aria-hidden="true"></i><i onClick={this.nextSong.bind(this)} className="fa fa-step-forward" aria-hidden="true"></i><i onClick={this.pause.bind(this)} ref='pauseandplay' className={AppState.pauseandplay} aria-hidden="true"></i></div>
        <audio ref='audio' src={playing.url} autoPlay="autoplay">
        </audio>
        <img src={playing.cover} height="250" width="250" />
    </div>
    <Playlist/>
			</div>)
    }
}
