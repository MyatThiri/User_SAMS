var db = require('../dbcon');

var FindDB = {
  find: function(name,m,callback){
    var sql = 'SELECT a.*, b.roll_no FROM '+name+' AS a JOIN student AS b ON a.stu_id = b.sid WHERE month='+m;
    return db.query(sql,[name],callback);
  },
  updateAtt: function (name,id,m,subj,callback) {
    var sql = 'UPDATE '+name+' SET '+subj+'_acount = '+subj+'_acount + 1 WHERE stu_id = '+id+' AND month = '+m+'';
    return db.query(sql,[name],callback);
  },
  updateAll: function (name,m,subj,callback) {
    var sql = 'UPDATE '+name+' SET '+subj+'_count = '+subj+'_count + 1 WHERE month = '+m+'';
    return db.query(sql,[name],callback);
  },
  findAtt: function (name,dbN,callback) {
    var sql = 'SELECT a.stu_name,b.roll_no, a.'+name+'_count AS count, a.'+name+'_acount AS acount, a.month FROM '+dbN+' AS a JOIN student AS b ON a.stu_id = b.sid';
    return db.query(sql,[name],callback);
  },
  findStu: function (dbN,sid,callback) {
    var sql = 'SELECT * FROM '+dbN+' WHERE stu_id='+sid+'';
    return db.query(sql,[sid],callback);
  }
};

module.exports = FindDB;
