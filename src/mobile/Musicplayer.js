import React from "react";
import style from "./css/musicplayer.scss";
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
    componentWillMount() {
        AppState.changeAppBar('音乐')
        AppState.initSongsPHP()
    }
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
        audio.currentTime = Math.round(event.nativeEvent.offsetX / 300 * audio.duration);
    }
    like(event) {}
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
        let playing = AppState.musicData[AppState.playing] || {
            name: '歌曲名称',
            url: '',
            artist: '歌手',
            cover: ''
        }
        const actions = [
            <FlatButton
        label="取消"
        primary={true}
        onTouchTap={this.handleClose}
      />,
            <FlatButton
        label="提交"
        primary={true}
        onTouchTap={this.handleSumbit}
      />,
        ];
        return (
            <div>
		<header className={style.header} onClick={this.handleOpen}>CLICK <span >HERE</span> TO RECOMMAND SONGS TO ME!</header>
			<div className={style.mainplayer}>
			<img src={playing.cover}  width="300" />
        <h1>{playing.name}</h1>
        <h2>{playing.artist}</h2>
        <div className={style.control}>
            <h5>{AppState.playtime}</h5>
            <div className={style.playline}  onClick={this.playFromHere.bind(this)}>
		<div ref='green' style={{'width':AppState.timelinewidth}}></div>
            </div>
        </div>
        <div className={style.icons}><i onClick={this.like.bind(this)} className="fa fa-heart" aria-hidden="true"></i><i onClick={this.nextSong.bind(this)} className="fa fa-step-forward" aria-hidden="true"></i><i onClick={this.pause.bind(this)} ref='pauseandplay' className={AppState.pauseandplay} aria-hidden="true"></i></div>
        <audio ref='audio' src={playing.url} autoPlay="autoplay">
        </audio>
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
