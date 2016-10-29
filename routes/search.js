var express = require('express');
var router = express.Router();

var db = require('../utils/db');

// return a list of citizens
router.get('/prefix/:userNamePrefix', function(req, res) {
	var prefix = req.params.userNamePrefix;
	db.searchCitizenGivenPrefix(prefix)
	.then(function(citizen) {
		res.status(200);
		res.send(citizen);
  	})
  	.catch(function(err) {
  		res.status(404);
  		res.send([]);
  	});
});

// return a list of citizens
router.get('/status/:status', function(req, res) {
	var status = req.params.status;
	db.searchCitizenGivenStatus(status)
	.then(function(citizen) {
		res.status(200);
		res.send(citizen);
  	})
  	.catch(function(err) {
  		res.status(404);
  		res.send([]);
  	});
});

// return a list of announcements
router.get('/announcements', function(req, res) {
	var words = req.query.words;
	db.searchAnnouncements(words)
	.then(function(announcements) {
		res.status(200);
		res.send(announcements);
  	})
  	.catch(function(err) {
  		res.status(404);
  		res.send([]);
  	});
});

// return a list of public messages
router.get('/public', function(req, res) {
	var words = req.query.words;
	db.searchPublicMessages(words)
	.then(function(messages) {
		res.status(200);
		res.send(messages);
  	})
  	.catch(function(err) {
  		res.status(404);
  		res.send([]);
  	});
});

// return a list of private messages
router.get('/private/:userName', function(req, res) {
	var words = req.query.words;
	var name = req.params.userName;

	db.searchPrivateMessages(name, words)
	.then(function(messages) {
		res.status(200);
		res.send(messages);
  	})
  	.catch(function(err) {
  		res.status(404);
  		res.send([]);
  	});
});

module.exports = router;
