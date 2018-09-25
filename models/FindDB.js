var db = require('../dbcon');

var FindDB = {
  find: function(name,callback){
    var sql = 'SELECT a.*, b.roll_no FROM '+name+' AS a JOIN student AS b ON a.stu_id = b.sid';
    return db.query(sql,[name],callback);
  },
  updateAtt: function (name,id,callback) {
    var sql = 'UPDATE '+name+' SET count = count + 1 WHERE stu_id = '+id+'';
    return db.query(sql,[name],callback);
  },
  updateAll: function (name,callback) {
    var sql = 'UPDATE '+name+' SET att_count = att_count + 1';
    return db.query(sql,[name],callback);
  }
};

module.exports = FindDB;
