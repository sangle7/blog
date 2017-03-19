import React from "react";
import style from "./css/musicplayer.scss";
import {
	musicData
} from './data.js';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import Playlist from './playlist.js';
import {
	AppState
} from './AppState.js';
import {
	observer
} from 'mobx-react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';



export default @observer class Musicplayer extends React.Component {
	componentDidMount() {
		this.interval = AppState.musicPlaying(this.refs.audio)
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	nextSong() {
		AppState.nextSong();
		this.refs.pauseandplay.className = 'fa fa-pause'
	}

	playFromHere(event) {
		let audio = this.refs.audio;
		this.refs.green.style.width = event.nativeEvent.offsetX + 'px';
		audio.currentTime = Math.round(event.nativeEvent.offsetX / 220 * audio.duration);
	}

	pause(event) {
		let audio = this.refs.audio;
		if (audio.paused) {
			event.nativeEvent.target.className = event.nativeEvent.target.className.replace(/play/, 'pause');
			audio.play();
		} else if (audio.ended) {
			event.nativeEvent.target.className = event.nativeEvent.target.className.replace(/play/, 'pause');
			audio.load();
		} else {
			event.nativeEvent.target.className = event.nativeEvent.target.className.replace(/pause/, 'play');
			audio.pause();
		}
	}

	state = {
		open: false,
	};

	handleOpen = () => {
		this.setState({
			open: true
		});
	};

	handleClose = () => {
		this.setState({
			open: false
		});
	};
	handleSumbit = () => {
		let [a, b, c] = [this.refs.songname.input.value,
			this.refs.songalbum.input.value, this.refs.songartist.input.value
		]
		AppState.poptipSubmit(a, b, c);
	}

	render() {
		const actions = [
			<FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleClose}
      />,
			<FlatButton
        label="提交"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSumbit}
      />,
		];
		return (
			<div>
		<header className={style.header} onClick={this.handleOpen}>CLICK <span >HERE</span> TO RECOMMAND SONGS TO ME!</header>
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
        <div className={style.icons}><i onClick={this.nextSong.bind(this)} className="fa fa-step-forward" aria-hidden="true"></i><i onClick={this.pause.bind(this)} ref='pauseandplay' className="fa fa-pause" aria-hidden="true"></i></div>
        <audio ref='audio' src={musicData[AppState.playing].url} autoPlay="autoplay">
        </audio>
        <img src={musicData[AppState.playing].cover} height="150" width="150" />
    </div>
    <Playlist/>
    <Dialog
          title="Recommand Songs"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
           <TextField ref="songname" hintText=" " floatingLabelText="歌名"/><br />
     <TextField ref="songalbum"
      hintText=" "
      floatingLabelText="专辑"
    /><br />
     <TextField ref="songartist"
      hintText=" "
      floatingLabelText="歌手"
    />
        </Dialog>
			</div>)
	}
}