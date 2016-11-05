var conn = require('./connection');

var tasks = {
	getAllTasks: function(callback) {
		var stmt = `SELECT * FROM todo_list`;
		conn.query(stmt, function(err, res) {
			if(err) throw err;
			callback(res)
		})
	},

	insertNewTask: function(newItem, callback) {
		//console.log('newItem in orm: ' + newItem);
		var stmt = `INSERT INTO todo_list (todo_item, completed) VALUES(??, 0)`;
		conn.query(stmt, [newItem], function(err, res) {
			console.log('newItem in query: ' + newItem);
			if(err) throw err;
			callback(res)
		})
	},

	updateTask: function(callback) {
		var stmt = `UPDATE todo_list SET completed = ? WHERE id = ?`;
		conn.query(stmt, function(err, res) {
			if(err) throw err;
			callback(res)
		})
	},

	deleteTask: function(id, callback) {
		var stmt = `DELETE FROM todo_list WHERE id = ?`;
		conn.query(stmt, [id], function(err, res) {
			if(err) throw err;
			callback(res)
		})
	}
}

module.exports = tasks;