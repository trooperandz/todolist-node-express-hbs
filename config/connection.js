var mysql = require('mysql');
var secret_keys = require('./secret_keys');

var conn = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: secret_keys.password,
	database: 'todolist_db'
});

conn.connect(function(err) {
	if(err) throw err;
	console.log("Db connection thread: " + conn.threadId);
});

module.exports = conn;