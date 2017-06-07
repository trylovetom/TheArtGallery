var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
// var config = require('./config.js')
var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host : config.mysql.host,
//   user : config.mysql.user,
//   password : config.mysql.password,
//   database : config.mysql.database
// });
var connection = mysql.createConnection({
  host : process.env.HOST,
  user : process.env.USER,
  password : process.env.Password,
  database : process.env.Database
});
process.env.PORT

connection.connect();
app.use(function(req, res, next) {
    req.db = connection;
    next();
});

var index = require('./routes/index');
var users = require('./routes/users');
var artist = require('./routes/artist');
var work = require('./routes/work');
var customer = require('./routes/customer');
var sale = require('./routes/sale');
var payment = require('./routes/payment');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/artist', artist);
app.use('/work', work);
app.use('/customer', customer);
app.use('/sale', sale);
app.use('/payment', payment);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
