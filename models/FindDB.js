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
  }
};

module.exports = FindDB;
