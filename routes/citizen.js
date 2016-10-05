var express = require('express');
var router = express.Router();

var db = require('../utils/db');

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
	} else { // check whether user exists
		var name = req.query.username;
		db.checkCitizen('Ivorssss')
		.then(function(citizen) {
			res.send({result : true});
		})
		.catch(function(err) {
			res.send({result : false});
		});
		 // empty json means not exist
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

router.post('/', function(req, res) { // update user online/offline
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
