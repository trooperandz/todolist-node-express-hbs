'use_strict';

const mysql = require('mysql');
const secret_keys = require('./secret_keys');

const conn = mysql.createConnection({
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