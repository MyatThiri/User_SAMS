var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'user_SAMS',
  password        : 'myatthiri',
  database        : 'db_SAMS'
  // host            : 'db4free.net',
  // user            : 'myatthiri',
  // password        : 'myatthiri',
  // database        : 'ptntu_attendance'
});

module.exports = pool;
