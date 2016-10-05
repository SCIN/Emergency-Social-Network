var db = require('./db');

var msg_body = {
	text : "HelloFSEsss",
	timestamp : "09/30/2016",
	sender : "Bob",
	status : "OK",
	location : "Building 19",
};

var ctz_body = {
	name : "Hector1",
	password: "Niceday1"
};

var state_body = {
	name : 'Ivor',
	online : false
}

db.checkCitizen('Ivorssss')
	.then(function(citizen) {
		console.log(citizen);
	})
	.catch(function(err) {
		console.log('err');
	});

db.updateCitizenState(state_body)
	.then(function() {
		console.log('update success!');
	})
	.catch(function(err) {
		console.log(err);
	});

// db.addCitizen(ctz_body)
// 	.then(function() {
// 		console.log('add citizen success!');
// 	})
// 	.catch(function(err) {
// 		console.log(err);
// 	});

// db.postPublicMessage(msg_body)
// 	.then(function() {
// 		console.log('post success!')
// 	})
// 	.catch(function(err) {
// 		console.log(err);
// 	});

// db.getPublicMessage()
//     		.then(function(data) {
//     			console.log('lalal2');
//     	  		console.log(data);
//     	  	})
//     	  	.catch(function(err) {
//     	  		console.log(err);
//     	  	});

// db.getAllCitizen()
// 	.then(function(citizen) {
// 		console.log(citizen);
// 	})
// 	.catch(function(err) {
// 		console.log(err);
// 	});

console.log('lalal2');