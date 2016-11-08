'use strict';

/**
 * Define system routing.
 *
 * @author Matthew Holland
 */

// Packages
const express = require('express')
const router  = express.Router()

// Modules
//const {getAll} = require('../models/tasks')
const model = require('../models/tasks')
const {deleteTask, updateTask, insertNewTask} = require('../config/orm');

router.get('/', function(req, res) {
	model.getAll(function(dataObj) {
		console.log('dataObj: ' , dataObj);
		res.render('index', { incompletedItems:dataObj.incompletedArr, completedItems:dataObj.completedArr });
	})
})

// If the add form is submitted, handle post
router.post('/add', function(req, res) {
	// newItem = the <form name="newItem">
	var newItem = req.body.newItem;
	console.log('newItem: ' + newItem)
	// Add the new item to the db
	insertNewTask(newItem, function(res) {
		console.log(newItem + 'was added successfully');
	})
	// Redirect to the root (i.e. reload the page)
	res.redirect('/')
})

// If the task icon is selected, delete the item
router.get('/delete-item/:id', function(req, res) {
	const id = req.params.id;
	deleteTask(id, function(res) {
		console.log('item with id ' + id + ' was removed')
	})
	res.redirect('/')
})

// If the task is marked as completed, update the completed value
router.get('/complete-item/:id', function(req, res) {
	const id = req.params.id;
	updateTask(id, function(res) {
		console.log('item with id ' + id + ' was marked as completed');
	})
	res.redirect('/')
})

module.exports = router;