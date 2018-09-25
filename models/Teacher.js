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
  compare:function(cleartext,encrypted){
    return bcrypt.compareSync(cleartext,encrypted);
  },

};
module.exports = Teacher;
