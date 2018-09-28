var express = require('express');
var router = express.Router();
var Student = require('../../models/Student');
var Subj = require('../../models/Subj');
var Attendance = require('../../models/Attendance');
var Timetable = require('../../models/Timetable');
var FindDB = require('../../models/FindDB');

//student role check

router.get('/', function(req,res){
  res.render('student/home', {title:'Student Home'});
});

router.get('/monthly', function(req,res,next){
  var att = []
  console.log(req.session.student);
  Student.findById(req.session.student.sid,function (err,rtn) {
    if(err) next (err);
    var dbName= rtn[0].class+rtn[0].dept_name;
    console.log(dbName.toLowerCase());
    FindDB.findStu(dbName,req.session.student.sid,function (err2,rtn2) {
      if(err2) next(err2);
      console.log('../././,..',rtn2);
      console.log(rtn[0].class,rtn[0].dept_id);
      Subj.findByTwo(rtn[0].class,rtn[0].dept_id,function (err3,rtn3) {
        if(err3) next (err3);
        console.log('subj list',rtn3);
        for(var b in rtn3){
          att.push([rtn3[b].subj_name+'_count',rtn3[b].subj_name+'_acount']);
        }
        console.log('./,mn',att);
        res.render('student/monthly-attendance', {title:'Monthly Attendance Percetage',data:rtn2,subj:rtn3,classN:dbName,stu:req.session.student.name,mon:att});
      });

    });

  })
});

router.get('/timetable', function(req,res,next){
  Student.findById(req.session.student.sid,function (err,rtn) {
    if(err) next (err);
    var classN = [rtn[0].class,rtn[0].dept_id];
    Timetable.findClass(classN,function (err2,rtn2) {
      if(err2) next (err2);
      console.log(rtn2);
      res.render('student/timetable', {title:'Timetable',list:rtn2});
    });
  });
});

module.exports = router;
