var express = require('express');
var router = express.Router();
var Teacher = require('../models/Teacher');
var Student = require('../models/Student');
var Attendance = require('../models/Attendance');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

/* GET login page */
router.get('/login', function(req, res, next) {
  console.log(req.cookies.email2);
  var email = (req.cookies.email2)?req.cookies.email2:'';
  res.render('commons/login', { title: 'Login', email:email });
});
router.get('/signin', function(req, res, next) {
  console.log(req.cookies.email3);
  var email = (req.cookies.email3)?req.cookies.email3:'';
  res.render('commons/signin', { title: 'Signin', email:email });
});


router.post('/login', function(req, res, next) {
  Teacher.findByEmail(req.body.email, function(err,teacher){
    if (err) next (err);
    console.log(teacher[0]);
    if(teacher.length == 0 || !Teacher.compare(req.body.password,teacher[0].password)){
      req.flash('warn', 'Email not exists or password not matched!!');
      console.log('not match');
      res.redirect('/login');
    }else {
      req.session.teacher = {tid:teacher[0].tid,name:teacher[0].name, email:teacher[0].email}
      if(req.body.one) res.cookie('email2',teacher[0].email, {maxAge:864008*7});
      else res.cookie('email2', '', {maxAge: 0});
      console.log('match');
      res.redirect('/teacher');
    }
  });
});

router.post('/signin', function(req, res, next) {
  Student.findByEmail(req.body.email, function(err,student){
    if (err) next (err);
    console.log(student[0]);
    if(student.length == 0 || !Student.compare(req.body.password,student[0].password)){
      req.flash('warn', 'Email not exists or password not matched!!');
      console.log('not match');
      res.redirect('/signin');
    }else {
      req.session.student = {sid:student[0].sid,name:student[0].name, email:student[0].email}
      if(req.body.one) res.cookie('email3',student[0].email, {maxAge:864008*7});
      else res.cookie('email3', '', {maxAge: 0});
      console.log('match');
      res.redirect('/student');
    }
  });
});


module.exports = router;
