var express = require('express');
var router = express.Router();
var users = require('./users');
var Teacher = require('../../models/Teacher');
var Attendance = require('../../models/Attendance');
var Timetable = require('../../models/Timetable');
var Subj = require('../../models/Subj');
var FindDB = require('../../models/FindDB');

//teacher role check


router.get('/',function(req,res){
  res.render('teacher/home', {title: 'Teacher Home'});
});

/*GET make attendance */
router.get('/make/:id', function(req,res,next){
  var a;
  var d = new Date();
   switch (d.getMonth()) {
     case 11:
       a=1;
       break;
     case 0:
       a=2;
       break;
     case 1:
       a=3;
       break;
     case 2:
       a=4;
       break;
     case 5:
       a=5;
       break;
     case 6:
       a=6;
       break;
     case 7:
       a=7;
       break;
     case 8:
       a=8;
       break;
     default:
       a=1;
   }
        FindDB.find(req.params.id,a, function (err4,rtn4) {
          if(err4) next(err4);
          console.log('vnvnvnvn',rtn4);
          res.render('teacher/make-attendance',{stulist:rtn4,subj:req.query.s,db:req.params.id,month:a});
        });
});

router.post('/assignAtt',function (req,res) {
  console.log('/////;//',req.body.list[0]);
  FindDB.updateAll(req.body.db,req.body.month,req.body.subj,function (err2,rtn2) {
    if(err2) next (err2);
    for (var i in req.body.list) {
      FindDB.updateAtt(req.body.db,req.body.list[i],req.body.month,req.body.subj,function (err,rtn) {
        if(err) next (err);
      });
    }
    res.json({status:true});
  });
});

router.get('/list',function(req,res,next){
  Teacher.findById(req.session.teacher.tid,function (err,rtn) {
    if(err) next(err);
    var params = [rtn[0].name,rtn[0].dept_id];
    Timetable.findWithTec(params,function (err2,rtn2) {
      if(err2) next (err2);
      res.render('teacher/attendance-list', {title: 'Attendance List',list:rtn2,dept:rtn[0].dept_id});
    });
  });
});

router.get('/weekly',function(req,res,next){
  res.render('teacher/weekly-attendance',{title: 'Weekly Attendance Count'});
});

router.use('/users',users);

module.exports = router;
