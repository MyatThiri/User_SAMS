var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'user_SAMS',
  password        : 'myatthiri',
  database        : 'db_SAMS'
});

module.exports = pool;
