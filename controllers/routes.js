var express = require('express')
var router  = express.Router()
var tasks   = require('../models/tasks')

router.get('/', function(req, res) {
	tasks.getAll(function(dataObj) {
		console.log('dataObj: ' , dataObj);
		res.render('index', { incompletedItems:dataObj.incompletedArr, completedItems:dataObj.completedArr });
	})
})

// If the <form action="/add" method="post"> is submitted, handle post
router.post('/add', function(req, res) {
	// newItem = the <form name="newItem">
	var newItem = req.body.newItem;
	console.log('newItem: ' + newItem)
	// Add the new item to the db
	tasks.addNew(newItem, function(res) {
		console.log(newItem + 'was added successfully');
	})
	// Redirect to the root (i.e. reload the page)
	res.redirect('/')
})

// If the trask icon is selected, delete the item
router.get('/delete-item/:id', function(req, res) {
	var id = req.params.id;
	tasks.deleteTask(id, function(res) {
		console.log('item with id ' + id + ' was removed')
	})
	res.redirect('/')
})

// If the task is marked as completed, update the completed value
router.get('/complete-item/:id', function(req, res) {
	var id = req.params.id;
	tasks.updateTask(id, function(res) {
		console.log('item with id ' + id + ' was marked as completed');
	})
	res.redirect('/')
})

// Access to api info
router.get('/api/user/:id', function(req, res) {
	var userId = req.params.id;
	res.redirect('/')
	console.log("userId: " + userId)
})

module.exports = router;