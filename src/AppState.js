import {
	observable
} from 'mobx';
import marked from 'marked';
import hljs from 'highlight.js';
import {
	documentData
} from './data.js';


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
	articleNumber: 0
});

AppState.init = function() {
	this.article = null;
	this.articlecontent = null;
	this.mdcontent = null;
	this.articleNumber = 0;
	this.musicNumber = 0;
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
AppState.initArticle = function(a, b) {
	let _xxx = documentData.filter((elem) => {
		if (elem.url == '/articles/' + a + '/' + b) {
			return elem;
		}
	})
	this.article = _xxx[0];
	this.changeAriticle("../" + _xxx[0].name + '.md')
}
AppState.MDtoHTML = function(value) {
	hljs.initHighlighting.called = false;
	this.mdcontent = marked(value)
}
AppState.changeAriticle = function(aaa) {
	this.AJAX(aaa)
		.then((code) => {
			this.articlecontent = marked(code)
			hljs.initHighlighting();
		})

	function MDtoHTML(bbb) {
		return new Promise((resolve, reject) => {
			let req = new XMLHttpRequest();
			let url = bbb;
			req.open('get', url);
			req.onload = function() {
				if (req.status == 200) {
					resolve(req.responseText)
				} else {
					reject(Error(req.statusText))
				}
			}
			req.onError = function() {
				reject(Error('error'))
			}
			req.send()
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
	let url = 'http://172.18.155.65:8080/home/?name=' + a + '&album=' + b + '&artist=' + c;
	this.poptipsubmit = true;
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
}
AppState.changePlaying = function(i) {
	this.playing = i;
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