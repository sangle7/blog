var http = require('http');
var request = require('request');
var fs = require('fs');
var _data = require('./data/data.js');

function downloadFile(uri, filename, callback) {
    var req = http.request(uri, function(res) {
        console.log("request: " + filename + " return status: " + res.statusCode);
        if (res.statusCode == '302') {
            var realurl = res.headers['location']
            if (fs.existsSync(filename)) {
                console.log(filename + ' exists!');
            } else {
                var stream = fs.createWriteStream(filename);
                request(realurl).pipe(stream).on('close', callback);
            }
        }
    });
    req.on('error', function(e) {
        console.log("request  error, try again");
    });
    req.end();
}
_data.musicData.forEach((elem) => {
    var fileUrl = "http://music.163.com/song/media/outer/url?id=" + elem.id + ".mp3";
    var filename = 'src/musics/' + elem.name + '.mp3';
    downloadFile(fileUrl, filename, function() {
        console.log(filename + '下载完毕');
    });
})
