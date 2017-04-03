var express = require('express');
var path = require('path');
var useragent = require('express-useragent');
var fs = require("fs");

var app = express();
var router = express.Router();

var mysql = require('mysql');

var TEST_DATABASE = 'musics';
var TEST_TABLE = 'musicrecommand';

// app.use(useragent.express());
app.use(express.static(path.join(__dirname, '..', 'buildmobile')))

app.all('*', function(req, res, next) {
	res.header("Cache-control", "max-age");
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});


app.get('/', function(req, res) {
	console.log(req.headers['user-agent'])
	if (/Android/.test(req.useragent)) {

	} else {
		app.use(express.static(path.join(__dirname, '..', 'build')))
	}
})
app.get('/home', function(req, res) {
	res.send('发送成功!');
	var client = mysql.createConnection({
		host: '172.18.155.65',
		user: 'root',
		password: '123456',
	});

	client.connect();
	client.query("use " + TEST_DATABASE);
	client.query('INSERT INTO ' + TEST_TABLE + " VALUES(NULL,'" + req.query.name + "','" + req.query.album + "','" + req.query.artist + "');");

	client.query(
		'SELECT * FROM ' + TEST_TABLE,
		function selectCb(err, results, fields) {
			if (err) {
				throw err;
			}

			if (results) {
				for (var i = 0; i < results.length; i++) {
					console.log("%d\t%s\t%s", results[i].id, results[i].name, results[i].album, results[i].artist);
				}
			}
			client.end();
		}
	);
});


var port = process.env.PORT || 8080;
app.use('/main', router);
app.listen(port);
console.log('Magic happens on port ' + port);