var express = require('express');
var router = express.Router();

router.get('/', function(req, res) { // get all messages
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
});

router.post('/', function(req, res) {
	var username = req.query.username;
	var message = req.query.message;
	var timestamp = new Date().toDateString();
	var status = req.query.status;
	var location = req.query.location;

	res.send('message added');
});

module.exports = router;

