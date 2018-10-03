var express = require('express');
var router = express.Router();
var Student = require('../../models/Student');
var Subj = require('../../models/Subj');
var Attendance = require('../../models/Attendance');
var Timetable = require('../../models/Timetable');
var FindDB = require('../../models/FindDB');

//student role check

router.get('/', function(req,res){
  res.render('student/home', {title:'Student Home',sid:req.session.student.sid});
});

router.get('/monthly', function(req,res,next){
  var att = []
  console.log(req.session.student);
  Student.findById(req.session.student.sid,function (err,rtn) {
    if(err) next (err);
    var dbName= rtn[0].class.toLowerCase()+rtn[0].dept_name;
    console.log(dbName.toLowerCase());
    FindDB.findStu(dbName.toLowerCase(),req.session.student.sid,function (err2,rtn2) {
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
        res.render('student/monthly-attendance', {title:'Monthly Attendance Percetage',data:rtn2,subj:rtn3,classN:dbName,stu:req.session.student.name,mon:att,sid:req.session.student.sid});
      });

    });

  })
});

router.get('/timetable', function(req,res,next){
  Student.findById(req.session.student.sid,function (err,rtn) {
    if(err) next (err);
    var query;
    switch (rtn[0].class) {
      case '6BE':
         query=')';
        break;
        case '5BE':
           query=' OR dept_id = 7)';
          break;
        case '4BE':
           query=' OR dept_id = 7 OR dept_id = 8)';
          break;
        case '3BE':
           query=' OR dept_id = 7 OR dept_id = 8)';
          break;
        case '2BE':
           query=' OR dept_id = 7 OR dept_id = 8)';
          break;
        case '1BE':
           query=' OR dept_id = 7 OR dept_id = 8 OR dept_id = 9 OR dept_id = 10  OR dept_id = 11)';
          break;
      default:

    }
    console.log(query);
    var classN = [rtn[0].class,rtn[0].dept_id,query];
    Timetable.findClass(classN,function (err2,rtn2) {
      if(err2) next (err2);
      console.log(rtn2);
      res.render('student/timetable', {title:'Timetable',list:rtn2,sid:req.session.student.sid});
    });
  });
});

/*Get password*/
router.get('/change/:sid', function(req,res,next){
  Student.findById(req.params.sid,function(err,student){
    if (err) throw err;
    if(student.length == 0) next (new Error('Student data not found!'));
    res.render('student/password', {title: 'Change Password', student: student[0]});
  });
});

/* Post password */
router.post('/change', function(req,res,next){
  var params = [req.body.password,req.session.student.sid];
  Student.update(params, function(sstudent,studentt){
    if (sstudent) throw sstudent;
    req.flash('info', 'Success');
    res.redirect('/student')
  });
});
module.exports = router;
