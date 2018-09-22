var db = require('../dbcon');

var Attendance = {
  add: function(params,callback){
    var sql = 'INSERT INTO attendance (date,att_seq,subj_id,tid) VALUES (?,?,?)';
    return db.query(sql,params,callback);
  },
};

module.exports = Attendance;
