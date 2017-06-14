'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _data = require('./data/data.js');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }; }

// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import { matchPath } from 'react-router-dom';
// import { RouterContext } from 'react-router-dom';
// import routes from './routes';
// import NotFoundPage from './components/pc/ErrorPage';

// initialize the server and configure support for ejs templates
var app = new _express2.default();
var server = new _http.Server(app);
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));


// define the folder that will be used for static assets
app.get('/', function(req, res) {
    handleUA(req, res);
});

app.get('/getArticleList', function(req, res) {
    res.send(JSON.stringify(_data.documentData));
});

app.get('/getMusicData', function(req, res) {
    res.send(JSON.stringify(_data.musicData));
});

function handleUA(req, res) {
    var ua = req.headers['user-agent'];
    var mobileList = ["comFront", 'iPhone', 'MIDP-2.0', "Opera Mini", "UCWEB", "Android", "Windows CE", "SymbianOS"];
    if (mobileList.some(function(elem) {
            return ua.indexOf(elem) >= 0;
        })) {
        res.sendFile(__dirname + '/static-mobile/index.html');
    } else {
        res.sendFile(__dirname + '/static-pc/index.html');
    }
}
app.use(_express2.default.static(__dirname));
app.use(_express2.default.static(_path2.default.join(__dirname, 'static-pc')));
app.use(_express2.default.static(_path2.default.join(__dirname, 'static-mobile')));
app.use(function(req, res, next) {
    if (res.status(404)) {
        handleUA(req, res);
    }
});

//universal routing and rendering
// app.get('*', (req, res) => {
//     matchPath({ routes, location: req.url },
//         (err, redirectLocation, renderProps) => {

//             // in case of error display the error message
//             if (err) {
//                 return res.status(500).send(err.message);
//             }

//             // in case of redirect propagate the redirect to the browser
//             if (redirectLocation) {
//                 return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
//             }

//             // generate the React markup for the current route
//             let markup;
//             if (renderProps) {
//                 // if the current route matched we have renderProps
//                 markup = renderToString(<RouterContext {...renderProps}/>);
//             } else {
//                 // otherwise we can render a 404 page
//                 markup = renderToString(<NotFoundPage/>);
//                 res.status(404);
//             }

//             // render the index template with the embedded React markup
//             return res.render('index', { markup });
//         }
//     );
// });

// start the server
var port = process.env.PORT || 3000;
var env = process.env.NODE_ENV || 'production';
server.listen(port, function(err) {
    if (err) {
        return console.error(err);
    }
    console.info('Server running on http://localhost:' + port + ' [' + env + ']');
});
