const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bb = require('express-busboy');

const init = (data) => {
    const app = express();

    require('./auth/auth').applyTo(app, data);
    app.set('view engine', 'pug');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    bb.extend(app, {
        upload: true,
        path: __dirname+'/../static/uploads',
        allowedPath: /./
    });    
    app.use('/libs', express.static(path.join(__dirname, '../node_modules')));
    app.use('/static', express.static(path.join(__dirname, '../static')));
    app.use(cookieParser('keyboard cat'));
    app.use(require('connect-flash')());
    app.use((req, res, next) => {
        res.locals.messages = require('express-messages')(req, res);
        next();
    });

    

    require('./routers').attachTo(app, data);
    
    return Promise.resolve(app);
}

module.exports = {
    init
}