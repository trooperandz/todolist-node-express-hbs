var orm = require('../config/orm')
var moment = require('moment')

var tasks = {
	getAll: function(callback) {
		orm.getAllTasks(function(res) {
			var completedArr   = [];
			var incompletedArr = [];
			res.forEach(function(obj, index) {
				var id   = obj.id;
				var date = moment(obj.createdAt).format('MM/DD/YYYY');
				var desc = obj.todo_item;
				var completed = obj.completed;
				if(completed) {
					completedArr.push({ id:id, date:date, desc: desc });
				} else {
					incompletedArr.push({ id:id, date:date, desc: desc });
				}
			})
			var data = { completedArr:completedArr, incompletedArr:incompletedArr };
			console.log('incompleted arr: ' + incompletedArr.length);
			callback(data);
		})
	},

	addNew: function(newItem, callback) {
		//console.log('new item in model: ' + newItem);
		orm.insertNewTask(newItem, function(res) {
			callback(res);
		})
	}
}

module.exports = tasks;