var express = require('express');
var router = express.Router();

var db = require('../utils/db');

router.get('/', function(req, res) { // get all messages
	db.getPublicMessage()
	.then(function(data) {
		res.send(data);
		//console.log('lalal2');
  		//console.log(data);
  	})
  	.catch(function(err) {
  		res.send([]);
  		//console.log(err);
  	});
  	/*
	var list = [];
	var message1 = {
		text : "HelloWorld",
		timestamp : "09/29/2016",
		sender : "Raj",
		status : "OK",
		location : "Building 23",
		messageId : 1
	};
	var message2 = {
		text : "HelloFSE",
		timestamp : "09/30/2016",
		sender : "Bob",
		status : "OK",
		location : "Building 19",
		messageId : 2
	};
	list.push(message1);
	list.push(message2);
	res.send(list);
	*/
});

router.post('/', function(req, res) {
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
	/*
	var sender = req.body.sender;
	var text = req.body.text;
	var timestamp = req.body.timestamp;
	var status = req.body.status;
	var location = req.body.location;
	*/

});

module.exports = router;
