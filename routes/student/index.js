var express = require('express');
var router = express.Router();

//student role check

router.get('/', function(req,res){
  res.render('student/home', {title:'Student Home'});
});

module.exports = router;
