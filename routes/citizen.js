var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	if (req.query.username == null) { // get all users
		var list = [];
		var user1 = {
			name : "Raj",
			online : "Yes"
		};
		var user2 = {
			name : "Tom",
			online : "No"
		};
		list.push(user1);
		list.push(user2);

		res.send(list);
	} else { // check whether user exists
		res.send('{}'); // empty json means not exist
	}
});

router.post('/', function (req, res) { // add a new user to directory
	var username = req.query.username;
	var password = req.query.password;
	// must be online now
	res.send(username + ' is added successfully');
}); 

router.put('/', function(req, res) { // update user online/offline
	var online = req.query.online;
	res.send('online/offline is updated successfully');
});

module.exports = router;
