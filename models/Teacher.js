var db = require('../dbcon');
var bcrypt = require('bcrypt-nodejs');

var Teacher = {
  findByEmail: function(email,callback){
    console.log('call');
    var sql = 'SELECT * FROM teacher WHERE email = ?';
    return db.query(sql, [email], callback);
  },
  findById: function(id,callback){
    console.log('call');
    var sql = 'SELECT * FROM teacher WHERE tid = ?';
    return db.query(sql, [id], callback);
  },
  findByName: function(name,callback){
    console.log('call');
    var sql = 'SELECT * FROM timetable WHERE name = ?';
    return db.query(sql, [name], callback);
  },
  update: function(params, callback) {
    console.log(bcrypt.hashSync(params[0],bcrypt.genSaltSync(8), null));
    var sql = "UPDATE teacher SET password = ?, updated = NOW() WHERE tid = ?";
      params[0] = bcrypt.hashSync(params[0],bcrypt.genSaltSync(8), null);
    return db.query(sql, params, callback);
  },
  compare:function(cleartext,encrypted){
    return bcrypt.compareSync(cleartext,encrypted);
  },

};
module.exports = Teacher;
