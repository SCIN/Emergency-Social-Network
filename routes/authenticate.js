var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	if (req.query.username != null && req.query.password != null) {
		res.status(200);
		res.send('Pass');
	} else {
		res.status(400);
		res.send('Not Pass');
	}
});

module.exports = router;
