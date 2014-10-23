var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var ect = require('ect');
var socketIO = require('socket.io');
var multer = require('multer');
var settings = require('./lib/init');
var apiRouter = require('./lib/api_router');
var dbWrapper = require('./lib/api/db_wrapper');
var fs = require('fs');
var _ = require('underscore');

// create instance
var app = express();

// ect setup
app.engine('ect', ect({
    watch: true,
    root: __dirname + '/views',
    ext: '.ect'
}).render);

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ect');


// User init
// set routing

var pref = new settings('settings.json');
app.use(multer({
    dest: pref.prefs.music_folder
}));

dbWrapper.init(pref.prefs.db_name);


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('url root', pref.prefs.url_root);
app.set('public', path.join(__dirname, 'public'));
app.set('static js', app.get('url root') + 'js/');
app.set('static css', app.get('url root') + 'css/');


app.use(cookieParser());
app.use(express.static(app.get('public')));

apiRouter(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;