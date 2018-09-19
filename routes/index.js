var express = require('express');
var router = express.Router();
var Teacher = require('../models/Teacher');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('commons/login', { title: 'Login' });
});

router.post('/login', function(req, res, next) {
  Teacher.findByEmail(req.body.email, function(err,teacher){
    if (err) next (err);
    if(teacher.length == 0 || !Teacher.compare(req.body.password,teacher[0].password)){
      req.flash('warn', 'Email not exists or password not matched!!');
      res.redirect('/login');
    }else {
      req.session.teacher = {tid:teacher[0].tid,}
    }
  })
  res.render('commons/login', { title: 'Login' });
});

module.exports = router;
