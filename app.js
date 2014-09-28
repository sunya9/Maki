
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

// api endpoint
// var upload = require('./routes/upload');

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


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(multer({
    dest: './musics'
}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// set routing
// app.use('/upload', upload.);
apiRouter(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var pref = new settings('settings.json');

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