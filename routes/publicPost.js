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

module.exports = router;
