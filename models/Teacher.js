var db = require('../dbcon');
var bcrypt = require('bcrypt-nodejs');

var Teacher = {
  findByEmail: function(email,callback){
    var sql = 'SELECT * FROM teacher WHERE id = ?';
    return db.query(sql, [email], callback);
  },

};
module.exports = Teacher;
