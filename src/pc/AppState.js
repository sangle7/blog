import {
    observable
} from 'mobx';
import marked from 'marked';
import hljs from 'highlight.js';

let renderer = new marked.Renderer();
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
renderer.heading = function(text, level) {
    return '<h' + level + ' class="header-TOC">' + text + '</h' + level + '>';
}

export const AppState = observable({
    colorStyle: {
        mainColor: '#FF5252',
        darkColor: '#FF1744',
        lightColor: '#FF8A80',
    },
    coverClass: "cover_red",
    uncoverClass: 'uncover_togreen',
    musicNumber: 0,
    wechat: "none",
    articlecontent: null,
    article: { name: '', url: '', category: '', date: '' },
    mdcontent: null,
    poptipsubmit: false,
    poptipstyle: 'none',
    playing: 0,
    playtime: '-00:00',
    timelinewidth: 0,
    articleNumber: 0,
    pauseandplay: 'fa fa-pause',
    articlecache: {},
    likenumber: 0,
    likeheart: 'fa fa-heart-o',
    likeflag: 0,
    TOCinnerHTML: '',
    TOC: false,
    TOCcontroller: 'fa fa-angle-left',
    mainbodyTransform: 'translateX(0)',
    TOCTransfrom: 'translateX(-220px)',
    TOCCTransfrom: 'translateX(0)',
    documentData: [],
    musicData: []
});
AppState.init = function() {
    this.article = { name: '', url: '', category: '', date: '' };
    this.articlecontent = null;
    this.pauseandplay = 'fa fa-pause';
    this.mdcontent = null;
    this.articleNumber = 0;
    this.musicNumber = 0;
    this.likeheart = 'fa fa-heart-o';
    this.likeflag = 0;
    this.TOCinnerHTML = '';
    this.TOCcontroller = 'fa fa-angle-left';
}
AppState.initArticleList = function() {
    let _documentData = [];
    fetch('http://test.sangle7.com/php/getArticleList.php')
        .then(blob => blob.json())
        .then((data) => {
            _documentData.push(...data)
            this.documentData = _documentData.sort((b, a) => {
                return parseInt(a.date.replace(/-/g, '')) - parseInt(b.date.replace(/-/g, ''))
            })
        })
}
AppState.initSongsPHP = function() {
    fetch('http://test.sangle7.com/php/getMusicData.php')
        .then(blob => blob.json())
        .then((data) => {
            this.musicData.push(...data)
        })
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
AppState.Uninit = function() {
    this.mainbodyTransform = 'translateX(0)'
}
AppState.initArticle = function(a) {
    this.TOC = true;
    this.mainbodyTransform = 'translateX(220px)'
    this.TOCTransfrom = 'translateX(0)';
    this.TOCCTransfrom = 'translateX(220px)';
    this.TOCcontroller = 'fa fa-angle-left';
    let documentData = this.documentData
    let newArr = documentData.map((elem, index) => {
        return elem.name
    })
    let number = newArr.indexOf(a)
    if (number >= 0) {
        if (this.article == null || this.article.name !== documentData[number].name) {
            this.article = documentData[number];
            this.nextArticle = documentData[number + 1] || documentData[0];
            this.previousArticle = documentData[number - 1] || documentData[documentData.length - 1];
            this.getLikeNumber(documentData[number].name)
            this.changeAriticle("../" + a + '.md')
        }
    }
}
AppState.MDtoHTML = function(value) {
    hljs.initHighlighting.called = false;
    this.mdcontent = marked(value)
}
AppState.changeAriticle = function(aaa) {
    if (this.articlecache[aaa]) {
        this.articlecontent = this.articlecache[aaa];
        hljs.initHighlighting();
        hljs.initHighlighting.called = false;
        setTimeout(this.initTOC, 200)
    } else {
        this.AJAX(aaa)
            .then((code) => {
                this.articlecontent = marked(code, {
                    renderer: renderer
                });
                this.initTOC();
                this.articlecache[aaa] = this.articlecontent
                hljs.initHighlighting();
                hljs.initHighlighting.called = false;

            })
    }
}
AppState.showOrHideTOC = function() {
    if (this.TOC) {
        this.TOC = false;
        this.mainbodyTransform = 'translateX(0)';
        this.TOCTransfrom = 'translateX(-220px)';
        this.TOCCTransfrom = 'translateX(0)';
        this.TOCcontroller = 'fa fa-angle-right';
    } else {
        this.TOC = true;
        this.mainbodyTransform = 'translateX(220px)';
        this.TOCCTransfrom = 'translateX(220px)'
        this.TOCTransfrom = 'translateX(0)';
        this.TOCcontroller = 'fa fa-angle-left';
    }
}
AppState.initTOC = function() {
    var TOClist = document.getElementsByClassName('header-TOC')
    var _str = '';
    for (let i = 0; i < TOClist.length; i++) {
        TOClist[i].id = 'heading' + i;
        _str += '<a class=TOC-' + TOClist[i].tagName + ' href=#heading' + i + '>' + TOClist[i].innerHTML + '</a></br>'
    }
    this.TOCinnerHTML = _str;
    if (document.getElementById('category')) {
        document.getElementById('category').innerHTML = _str
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
            console
                .log('ERROR: ' + status)
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
        if (audio2.ended) {
            this.pauseandplay = 'fa fa-play';
        }
    }, 1000)
}
AppState.handleArticleLike = function(a) {
    let url = 'https://sangle.000webhostapp.com/handlelike.php?articlename=' + a;
    this.likenumber++;
    this.likeheart = 'fa fa-heart';
    this.likeflag = 1;
    this.AJAX(url)
        .then((text) => { // 如果AJAX成功，获得响应内容

        }).catch((status) => { // 如果AJAX失败，获得响应代码
            console.log('ERROR: ' + status)
        });
}
AppState.getLikeNumber = function(name) {
    let url = 'https://sangle.000webhostapp.com/getLikeNumber.php?articlename=' + name;
    this.AJAX(url)
        .then((text) => { // 如果AJAX成功，获得响应内容
            let arr = text.split("<br>");
            this.likenumber = arr[0];
            if (arr[1] != 0) {
                this.likeheart = 'fa fa-heart';
                this.likeflag = 1;
            } else {
                this.likeheart = 'fa fa-heart-o';
                this.likeflag = 0;
            }
        }).catch((status) => { // 如果AJAX失败，获得响应代码
            console.log('ERROR: ' + status)
        });
}
AppState.changeMainColor = function() {
    if (this.colorStyle.mainColor == '#FF5252') {
        this.colorStyle = {
            mainColor: '#8bc34a',
            darkColor: '#558b2f',
            lightColor: '#aed581',
        }
        this.uncoverClass = 'uncover_tored';
        this.coverClass = "cover_green";
    } else {
        this.colorStyle = {
            mainColor: '#FF5252',
            darkColor: '#FF1744',
            lightColor: '#FF8A80',
        }
        this.uncoverClass = 'uncover_togreen';
        this.coverClass = "cover_red"
    }
}
