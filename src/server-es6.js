import path from 'path';
import { Server } from 'http';
import Express from 'express';
import { documentData, musicData } from './data/data.js'
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import { matchPath } from 'react-router-dom';
// import { RouterContext } from 'react-router-dom';
// import routes from './routes';
// import NotFoundPage from './components/pc/ErrorPage';

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function() {
        for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        return this;
    };
}
// define the folder that will be used for static assets
app.get('/', function(req, res) {
    handleUA(req, res)
});

app.get('/getArticleList', function(req, res) {
    res.send(JSON.stringify(documentData));
})

app.get('/getMusicData', function(req, res) {
    res.send(JSON.stringify(musicData.shuffle()));
})


function handleUA(req, res) {
    const ua = req.headers['user-agent']
    const mobileList = ["comFront", 'iPhone', 'MIDP-2.0', "Opera Mini", "UCWEB", "Android", "Windows CE", "SymbianOS"]
    if (mobileList.some((elem) => ua.indexOf(elem) >= 0)) {
        res.sendFile(__dirname + '/static-mobile/index.html')
    } else {
        res.sendFile(__dirname + '/static-pc/index.html')
    }
}
app.use(Express.static(__dirname));
app.use(Express.static(path.join(__dirname, 'static-pc')));
app.use(Express.static(path.join(__dirname, 'static-mobile')));
app.use(function(req, res, next) {
    if (res.status(404)) { handleUA(req, res) }
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
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:${port} [${env}]`);
});
