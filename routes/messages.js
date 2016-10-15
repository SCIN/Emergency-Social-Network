var express = require('express');
var router = express.Router();

var db = require('../utils/db');

router.get('/public', function(req, res) { // get all messages
	db.getPublicMessage()
	.then(function(data) {
		res.send(data);
  	})
  	.catch(function(err) {
  		res.send([]);
  	});
});

router.get('/public/:userName', function(req, res) {
	var username = req.params.userName;
	db.getPublicMessageOfUser(username)
	.then(function(data) {
		res.send(data);
  	})
  	.catch(function(err) {
  		res.send([]);
  	});
});

router.post('/public', function(req, res) {
	console.log(req.body);
	db.postPublicMessage(req.body)
	.then(function() {
		res.send({result : true});
		console.log('post success!')
	})
	.catch(function(err) {
		res.send({result : false});
		console.log(err);
	});

});

// Send a chat message to another user
router.post('/private', function(req, res) {
	db.postPrivateMessage(req.body)
	.then(function() {
		res.send({result : true});
		console.log('post success!')
	})
	.catch(function(err) {
		res.send({result : false});
		console.log(err);
	});
});

// Retrieve all private chat messages between two users
router.get('/private/:userName1/:userName2', function(req, res) {
	var username1 = req.params.userName1;
	var username2 = req.params.userName2;
	db.getPrivateMessage(username1, username2)
	.then(function(data) {
		res.send(data);
  	})
  	.catch(function(err) {
  		res.send([]);
  	});
});

module.exports = router;
