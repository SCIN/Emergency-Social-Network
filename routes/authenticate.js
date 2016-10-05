var express = require('express');
var router = express.Router();

var db = require('../utils/db');

router.get('/', function(req, res) {
	if (req.query.username != null && req.query.password != null) { 
		var body = {
			name : req.query.username,
			password : req.query.password
		}
		db.authenticate(body)
		.then(function() {
			res.status(200);
			res.send({result : true});
			console.log('success!')
		})
		.catch(function(err) {
			res.status(400);
			res.send({result : false});
			console.log(err);
		});
	} else {
		res.status(400);
		res.send({result : false});
	}
});

module.exports = router;
