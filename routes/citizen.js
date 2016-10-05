var express = require('express');
var router = express.Router();

var db = require('../utils/db');

router.get('/authenticate/', function(req, res) {
	if (req.query.username != null && req.query.password != null) { 
		var body = {
			name : req.query.username,
			password : req.query.password
		}
		db.authenticate(body)
		.then(function() {
			res.send({result : true});
			console.log('success!')
		})
		.catch(function(err) {
			res.send({result : false});
			console.log(err);
		});
	} else {
		res.send({result : false});
	}
});

router.get('/check/', function(req, res, next) {
	var name = req.query.username;
	db.checkCitizen(name)
	.then(function(citizen) {
		res.send({result : true});
	})
	.catch(function(err) {
		res.send({result : false});
	});
});

router.get('/', function(req, res, next) {
	if (req.query.username == null) { // get all users
		db.getAllCitizen()
		.then(function(citizen) {
			res.send(citizen);
			/*
			var list = [];
			citizen.forEach(function(user) {

			});
			console.log(citizen);*/
		})
		.catch(function(err) {
			console.log(err);
		});
		/*
		var user1 = {
			name : "Raj",
			online : true
		};
		var user2 = {
			name : "Tom",
			online : false
		};
		list.push(user1);
		list.push(user2);

		res.send(list);
		*/
	}
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

module.exports = router;
