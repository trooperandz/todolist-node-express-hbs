'use_strict';

/**
 * Provide data models for views etc.
 *
 * @author Matthew Holland
 */

// Packages
const moment = require('moment')

// Modules
const {getAllTasks} = require('../config/orm')

const models = {
	// Take all tasks, and place completed & incompleted in separate arrays. Format date for view.
	getAll: function(callback) {
		getAllTasks(function(res) {
			const completedArr   = [];
			const incompletedArr = [];
			res.forEach(function(obj, index) {
				const id   = obj.id;
				const date = moment(obj.createdAt).format('MM/DD/YYYY');
				const desc = obj.todo_item;
				const completed = obj.completed;
				if(completed) {
					completedArr.push({ id, date, desc });
				} else {
					incompletedArr.push({ id, date, desc });
				}
			})
			var data = { completedArr, incompletedArr };
			//console.log('incompleted arr: ' + incompletedArr.length);
			callback(data);
		})
	}
}

module.exports = models;