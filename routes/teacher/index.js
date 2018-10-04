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
  res.render('teacher/home', {title: 'Teacher Home',tid:req.session.teacher.tid});
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
          res.render('teacher/make-attendance',{stulist:rtn4,subj:req.query.s,time:req.query.t,db:req.params.id,month:a,tid:req.session.teacher.tid});
        });
});

router.post('/assignAtt',function (req,res) {
  console.log('do!!!',req.cookies.items);
  var list =(req.cookies.items)? req.cookies.items.list:[];
  console.log('do2222');
  list.push(req.body.time);
  res.cookie('items',{list:list}, {maxAge:43200});
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
  var ca_list = (req.cookies.items)? req.cookies.items:[];
  console.log('//././',ca_list);
  var d = new Date();
  day = d.getDay();
  Teacher.findById(req.session.teacher.tid,function (err,rtn) {
    if(err) next(err);
    var params = [rtn[0].name,rtn[0].dept_id,day];
    Timetable.findWithTec(params,function (err2,rtn2) {
      if(err2) next (err2);
      console.log(rtn2);
      if(rtn2.length == 0){
        console.log(typeof rtn2,rtn2);
      }
      var data = (rtn2.length ==0)? '0' : rtn2;
      console.log(data);
      res.render('teacher/attendance-list', {title: 'Attendance List',list:data,dept:rtn[0].dept_id, ca_list: ca_list,tid:req.session.teacher.tid});
    });
  });
});

router.get('/monthly',function(req,res,next){
  var major ;
  Teacher.findById(req.session.teacher.tid,function (err,rtn) {
    if(err) next(err);

    switch (rtn[0].dept_id) {
      case 1:
        major="it";
        break;
      case 2:
        major="civil";
        break;
      case 3:
        major="ec";
        break;
      case 4:
        major="ep";
        break;
      case 5:
        major="mp";
        break;
      case 6:
        major="mc";
        break;
      default:
        console.log('it');
    }
    var params = [rtn[0].name,rtn[0].dept_id]
    Timetable.findWithTecA(params,function (err2,rtn2) {
      if(err2) next(err2);
      console.log(rtn2[0]);
      var db = rtn2[0].class.toLowerCase()+major;
      FindDB.findAtt(rtn2[0].subj_name,db,function (err3,rtn3) {
        if(err3) next(err3);
        console.log(rtn3);
        res.render('teacher/monthly-attendance',{title: 'monthly Attendance Count',list:rtn3,sub_c:rtn2[0].subj_name+'_count',sub_a:rtn2[0].subj_name+'_acount',tid:req.session.teacher.tid});
      });

    });
  });

});

router.get('/timetable',function(req,res,next){
  Teacher.findByName(req.session.teacher.name,function (err,rtn) {
    if(err) next (err);
    res.render('teacher/timetable',{title:'Timetable', list:rtn});
  });

});


/* Get password */
router.get('/change/:tid', function(req,res,next){
  Teacher.findById(req.params.tid,function(err,teacher){
    if (err) throw err;
    if(teacher.length == 0) next (new Error('Teacher data not found!'));
    res.render('teacher/password', { title: 'Change Password', teacher: teacher[0]});
  });
});

/* Post password */
router.post('/change', function(req,res,next){
  var params = [req.body.password,req.session.teacher.tid];
    Teacher.update(params, function(tteacher,teacherr){
      if(tteacher) throw tteacher;
      req.flash('info', 'Success');
      res.redirect('/teacher');
    });
});
router.use('/users',users);



module.exports = router;
