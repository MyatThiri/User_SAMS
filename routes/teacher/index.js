var express = require('express');
var router = express.Router();
var users = require('./users');

//teacher role check


router.get('/',function(req,res){
  res.render('teacher/home', {title: 'Teacher Home'});
});

/*GET make attendance */
router.get('/make', function(req,res,next){
  res.render('teacher/make-attendance')
});
router.use('/users',users);

module.exports = router;
