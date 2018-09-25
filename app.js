var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('express-flash');
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var teacher = require('./routes/teacher/index');
var student = require('./routes/student/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/jquery-validation/dist'));

//session: before routing
app.use(session({
  secret: 'ExpressEJSBlank@@', //any string for Security
  resave: false,
  saveUninitialized: true
}));
app.use(flash()); // after session, before routing
app.use(flash());// after cookie, session

 // Set session for EJS // after session, before routing
 app.use(function(req, res, next){
   res.locals.user = req.session.user;
   next();
 });

app.use('/', indexRouter);
app.use(function(req, res, next){
   if(req.session.teacher || req.session.student){
     next();
   }else{
     req.flash('warning', 'authorization failed! Please login');
     req.flash('forward', req.path);
     var path = req.path.split('/');
     console.log(typeof path[1]);
     (path[1]=='teacher')? res.redirect('/login'): res.redirect('/signin')

   }
 });
// app.use('/users', usersRouter);
app.use('/teacher',teacher);
app.use('/student',student);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
