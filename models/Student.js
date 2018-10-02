var db = require('../dbcon');
var bcrypt = require('bcrypt-nodejs');

var Student = {
  add: function(params,callback){
    var sql = 'INSERT INTO student (name,roll_no,email,gender,ph_number,dept_id,class,password) VALUES (?,?, ?, ?, ?, ?, ?, ?)';
    params[7] = bcrypt.hashSync(params[7],bcrypt.genSaltSync(8),null);
    return db.query(sql, params, callback);
  },

  findByEmail: function(email,callback){
    var sql = 'SELECT * FROM student WHERE email = ?';
    return db.query(sql, [email], callback);
  },

  findById: function(sid, callback) {
    var sql = "SELECT sid, s.name,s.roll_no, s.email, s.gender,s.ph_number,s.dept_id,s.class, DATE_FORMAT(s.updated, '%d/%m/%Y %H:%i') AS updated, d.dept_name FROM student AS s JOIN dept AS d USING(dept_id) WHERE s.sid = ?";
    return db.query (sql, [sid], callback);
  },

  find: function(params, callback){
    // var p = [];
    var sql = "SELECT sid, s.name,s.roll_no, s.email, s.gender,s.ph_number,s.dept_id,s.class, DATE_FORMAT(s.updated, '%d/%m/%Y %H:%i') AS updated, d.dept_name FROM student AS s JOIN dept AS d USING(dept_id) ";
    if(params !=''){
      sql += "WHERE s.dept_id = "+params[0]+" AND s.class = '"+params[1]+"';"
    }
    return db.query(sql, params, callback);
  },

  update: function(params, callback) {
    var sql = "UPDATE student SET password = ? ,updated = NOW() WHERE sid = ?";
    params[0] = bcrypt.hashSync(params[0],bcrypt.genSaltSync(8), null);
    return db.query(sql,params,callback);
  },

  remove: function(sid,callback){
    var sql = "DELETE FROM student WHERE sid = ?";
    return db.query(sql, [sid], callback);
  },

  compare:function(cleartext,encrypted){
    return bcrypt.compareSync(cleartext,encrypted);
  },
};
module.exports = Student;
