
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser  = require('body-parser');
var dotenv = require('dotenv');
var formidable = require('formidable');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var sassMiddleware = require('node-sass-middleware');
var expressLess = require('express-less');

var routes = require('./routes/index');
var admin = require('./routes/admin');

var config = require('./config'); // get our config file

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.moment = require('moment-timezone');
app.set('port', process.env.PORT || 3000);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.set('superSecret', config.secret); // secret variable
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// adding the sass middleware
app.use(
    sassMiddleware({
        /* Options */
        src: path.join(__dirname, 'public/stylesheets/sass'),
        dest: path.join(__dirname, 'public/stylesheets'),
        debug: true,
        outputStyle: 'compressed',
        prefix: '/stylesheets'
    })
);

app.use('/less-css', expressLess(__dirname + '/public/stylesheets/less', {
    compress: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/admin', admin);

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
