import {
	observable
} from 'mobx';
import marked from 'marked';
import hljs from 'highlight.js';
import {
	documentData
} from './../data/data.js';


marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	tables: true,
	breaks: true,
	pedantic: false,
	sanitize: false,
	smartLists: true,
	smartypants: false
})
export const AppState = observable({
	musicNumber: 0,
	wechat: "none",
	articlecontent: null,
	article: null,
	mdcontent: null,
	poptipsubmit: false,
	poptipstyle: 'none',
	playing: 0,
	playtime: '-00:00',
	timelinewidth: 0,
	articleNumber: 0,
	pauseandplay: 'fa fa-pause',
	articlecache: {}
});

AppState.init = function() {
	this.article = null;
	this.articlecontent = null;
	this.mdcontent = null;
	this.articleNumber = 0;
	this.musicNumber = 0;
}
AppState.changePlayAndPause = function() {
	this.pauseandplay = this.pauseandplay == 'fa fa-play' ? 'fa fa-pause' : 'fa fa-play';
}
AppState.showWechatImg = function() {
	this.wechat = 'block';
}
AppState.hideWechatImg = function() {
	this.wechat = 'none';
}
AppState.showMoreMusics = function() {
	this.musicNumber += 10;
}
AppState.showMoreArticles = function() {
	this.articleNumber += 10;
}
AppState.initArticle = function(a) {
	let _xxx = documentData.filter((elem) => {
		if (elem.name == a) {
			return elem;
		}
	})
	if (this.article == null || this.article.name !== _xxx[0].name) {
		this.article = _xxx[0];
		this.changeAriticle("../" + a + '.md')
	}
}
AppState.MDtoHTML = function(value) {
	hljs.initHighlighting.called = false;
	this.mdcontent = marked(value)
}
AppState.changeAriticle = function(aaa) {
	if (this.articlecache[aaa]) {
		this.articlecontent = this.articlecache[aaa]
		hljs.initHighlighting();
	} else {
		this.AJAX(aaa)
			.then((code) => {
				this.articlecontent = marked(code)
				this.articlecache[aaa] = marked(code)
				hljs.initHighlighting();
			})
	}
}
AppState.AJAX = function(url) {
	var request = new XMLHttpRequest();
	return new Promise(function(resolve, reject) {
		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				if (request.status == 200) {
					resolve(request.responseText);
				} else {
					reject(request.status);
				}
			}
		};
		request.open('get', url);
		request.send();
	});
}
AppState.poptipSubmit = function(a, b, c) {
	let url = 'https://sangle.000webhostapp.com/server.php?name=' + a + '&album=' + b + '&artist=' + c;
	this.AJAX(url)
		.then((text) => { // 如果AJAX成功，获得响应内容
			this.poptipsubmit = true;
		}).catch((status) => { // 如果AJAX失败，获得响应代码
			console.log('ERROR: ' + status)
		});
}
AppState.showPoptip = function() {
	this.poptipstyle = 'block'
}
AppState.hidePoptip = function() {
	this.poptipstyle = 'none';
	this.poptipsubmit = false;
}
AppState.nextSong = function() {
	this.playing += 1;
	this.playtime = '-00:00';
	this.pauseandplay = 'fa fa-pause';
}
AppState.changePlaying = function(i) {
	this.playing = i;
	this.playtime = '-00:00';
	this.pauseandplay = 'fa fa-pause';
}
AppState.musicPlaying = function(audio2) {
	return setInterval(() => {
		let audio = audio2;
		let percent = Math.round(audio.currentTime) / Math.round(audio.duration);
		let min = Math.floor((Math.round(audio.duration) - Math.round(audio.currentTime)) / 60);
		let sec = Math.floor((Math.round(audio.duration) - Math.round(audio.currentTime)) % 60);
		if (sec / 10 < 1) {
			sec = '0' + sec;
		}
		this.playtime = '-0' + min + ':' + sec;;
		this.timelinewidth = percent * 430 + 'px';
	}, 1000)
}