var db = require('../dbcon');


var Timetable = {
  add: function(params,callback){
    var sql = 'INSERT INTO timetable (dept_id,name,subj_name,class,start_time,end_time,date_id) VALUES (?,?,?,?,?,?,?)';
    return db.query(sql,params,callback);
  },
  findById:function(tb_id,callback){
    var sql ="SELECT tb_id,dept_id, name, subj_name,class,start_time,end_time,date_id, DATE_FORMAT(updated, '%d/%m/%Y %H:%i') AS updated FROM timetable WHERE tb_id = ? ";
    return db.query(sql,[tb_id],callback);
  },

  find:function(params,callback){
    var sql ="SELECT tb_id,dept_id, name, subj_name,class,start_time,end_time,date_id, DATE_FORMAT(updated, '%d/%m/%Y %H:%i') AS updated FROM timetable";
    return db.query(sql,params,callback);
  },

  findWithTec:function (params,callback) {
    var sql = "SELECT subj_name, class, time FROM timetable WHERE name = ?  AND dept_id = ? AND date_id = ?";
    return db.query(sql,params,callback);
  },

  findWithTecA:function (params,callback) {
    var sql = "SELECT DISTINCT subj_name, class FROM timetable WHERE name = ?  AND dept_id = ? ";
    return db.query(sql,params,callback);
  },

  findClass:function (params,callback) {
    var sql = "SELECT subj_name, time, date_id FROM timetable WHERE class = ?  AND dept_id = ? ";
    return db.query(sql,params,callback);
  },

  update: function(params,callback){
    var sql = "UPDATE timetable SET dept_id =?, name =?, subj_name =?, class =?, start_time =?, end_time =?,date_id =?,updated = NOW() WHERE tb_id = ?";
    return db.query(sql,params,callback);
  },

  remove: function(tb_id,callback){
    var sql = "DELETE FROM timetable WHERE tb_id = ?";
    return db.query(sql, [tb_id], callback);
  },
}

module.exports = Timetable;
