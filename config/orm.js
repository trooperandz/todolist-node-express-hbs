'use strict';

/**
 * Provide and run queries against the database.
 *
 * @author Matthew Holland
 */

// Modules
const conn = require('./connection');

/**
 * Statements for the db query strings.
 *
 * @enum {sting} The SQL statement for the the task.
 */
const statement = {
	ALL: 'SELECT * FROM todo_list',
	INSERT: 'INSERT INTO todo_list (todo_item, completed) VALUES(?, 0)',
	UPDATE: 'UPDATE todo_list SET completed = 1 WHERE id = ?',
	DELETE: 'DELETE FROM todo_list WHERE id = ?',
}

const tasks = {
	getAllTasks: function(callback) {
		conn.query(statement.ALL, function(err, res) {
			if(err) throw err;
			callback(res)
		})
	},

	insertNewTask: function(newItem, callback) {
		conn.query(statement.INSERT, [newItem], function(err, res) {
			console.log('newItem in query: ' + newItem);
			if(err) throw err;
			callback(res)
		})
	},

	updateTask: function(id, callback) {
		conn.query(statement.UPDATE, [id], function(err, res) {
			if(err) throw err;
			callback(res)
		})
	},

	deleteTask: function(id, callback) {
		conn.query(statement.DELETE, [id], function(err, res) {
			if(err) throw err;
			callback(res)
		})
	}
}

module.exports = tasks;