'use strict';

var express = require('express');
var router = express.Router();

var db = require('../utils/db');

router.get('/authenticate/', function(req, res) {
	if (req.query.username && req.query.password) { 
		var body = {
			name : req.query.username,
			password : req.query.password
		};
		db.authenticate(body)
		.then(function() {
			res.send({result : true});
			console.log('success!');
		})
		.catch(function(err) {
			res.send({result : false});
			console.log(err);
		});
	} else {
		res.send({result : false});
	}
});

router.get('/', function(req, res, next) {
	if (!req.query.username) { // get all users
		db.getAllCitizen()
		.then(function(citizen) {
			res.send(citizen);
		})
		.catch(function(err) {
			console.log(err);
		});
	}
});

router.get('/:userName', function(req, res, next) {
	var username = req.params.userName;
	db.getCitizen(username)
	.then(function(citizen) {
		res.status(200);
		res.send(citizen);
	})
	.catch(function(err) {
		res.status(404);
		res.send([]);
		console.log(err);
	});
});

router.post('/', function (req, res) { // add a new user to directory
	var username = req.body.username;
	var password = req.body.password;
	var ctz_body = {
		name : username,
		password : password
	};
	db.addCitizen(ctz_body)
	.then(function() {
		res.send({result : true});
		//console.log('add citizen success!');
	})
	.catch(function(err) {
		res.send({result : false});
		//console.log(err);
	});
	// must be online now
}); 

// Retrieve all users with whom a user has privately chatted with
router.get('/:userName/private', function(req, res) {
	var username = req.params.userName;
	db.getPrivateChatUsers(username)
	.then(function(users) {
		res.send(users);
  	})
  	.catch(function(err) {
  		res.send([]);
  	});
});

// Update a user's status and create a breadcrumb
router.post('/:userName/status/:statusCode', function(req, res) {
	var userName = req.params.userName;
	var statusCode = req.params.statusCode;

	var location = req.body.location;
	var timeStamp = req.body.timeStamp;

	var status = {
		userName : userName,
		statusCode : statusCode,
		location : location,
		timestamp : timeStamp
	};
	db.updateCitizenStatus(status)
	.then(function() {
		res.status(201);
		res.send({result : true});
	})
	.catch(function(err) {
		res.status(404);
		res.send({result : false});
	});
});

//Change online status
router.post('/online/', function(req, res) { // update user online/offline
	var online = req.body.online;
	var username = req.body.username;
	var state_body = {
		name : username,
		online : online
	};
	db.updateCitizenState(state_body)
		.then(function() {
			res.send({result : true});
			//console.log('update success!');
		})
		.catch(function(err) {
			res.send({result : false});
			//console.log(err);
		});
});

// Retrieve a user's status history (all breadcrumbs)
router.get('/:userName/statuscrumbs', function(req, res) {
	var userName = req.params.userName;
	db.getStatusHistory(userName)
	.then(function(breadcrumbs) {
		res.send(breadcrumbs);
  	})
  	.catch(function(err) {
  		res.status(404);
  		res.send([]);
  	});
});

module.exports = router;
