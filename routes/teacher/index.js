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
      Subj.findByName(req.params.id,function (err3,rtn3) {
        if(err3) next(err3);
        console.log('..//s//s',rtn3[0].code.toLowerCase());
        FindDB.find(rtn3[0].code.toLowerCase(), function (err4,rtn4) {
          if(err4) next(err4);
          console.log('vnvnvnvn',rtn4);
          res.render('teacher/make-attendance',{stulist:rtn4,subj:req.params.id,code:rtn3[0].code.toLowerCase()});
        });

  });
});

router.post('/assignAtt',function (req,res) {
  console.log('/////;//',req.body.list[0]);
  FindDB.updateAll(req.body.code,function (err2,rtn2) {
    if(err2) next (err2);
    for (var i in req.body.list) {
      FindDB.updateAtt(req.body.code,req.body.list[i],function (err,rtn) {
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
      res.render('teacher/attendance-list', {title: 'Attendance List',list:rtn2});
    });
  });
});

router.get('/weekly',function(req,res,next){
  res.render('teacher/weekly-attendance',{title: 'Weekly Attendance Count'});
});

router.use('/users',users);

module.exports = router;
