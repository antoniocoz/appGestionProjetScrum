//Setup database et dependencies
var mongoose = require('mongoose');
require('./models/Backlogs');
require('./models/Userstories');
require('./models/Taches');
require('./models/Sprints');
require('./models/Users');
//mongoose.connect('mongodb://localhost/cdp');
// connextion a la base de données online (mongolab)
mongoose.connect('mongodb://scrum:developpement@ds047458.mongolab.com:47458/projetscrumdev');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var backlogs = require('./routes/backlog/backlog.server.route');
var userstories = require('./routes/userstories/userstories.server.route');
//var users = require('./routes/users');
var taches = require('./routes/taches/taches.server.route');
var sprints = require('./routes/sprints/sprints.server.route');
var commits = require('./routes/commits/commits.server.route');
var users = require('./routes/users/users.server.route');
var gantts = require('./routes/gantts/gantts.server.route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);
app.use('/', backlogs);
app.use('/', userstories);
app.use('/', taches);
app.use('/', sprints);
app.use('/', commits);
app.use('/', users);
app.use('/', gantts);

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
