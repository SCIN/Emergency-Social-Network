var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var citizen = require('./routes/citizen');
var messages = require('./routes/messages');

var app = express();
var port = process.env.PORT || 3000;
// app.set('port', (process.env.PORT || 5000));
// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });

// setup socket
var http = require('http').createServer(app);
var io = require('socket.io')(http);
http.listen(port, function(){
  console.log('listening on *:3000');
});

var users = [];
var sockets = [];

var db = require('./utils/db');

db.getAllCitizenStatus()
.then(function(citizen) {
  for(var i = 0; i < citizen.length; i++){
  	var person = citizen[i];
  	var user = {
  		"clientId" : -1,
  		"username" : person.name,
  		"online" : false,
  		"status" : person.status,
  		"location" : person.location,
  		"timestamp" : person.timestamp
  	}
  	users.push(user);
  }
})
.catch(function(err) {
	console.log(err);
});

io.on('connection', function(socket){
    console.log("connect");

    var clientId = socket.id;

    // new user
    socket.on('regist', function(message) {
      users.push({"clientId" : clientId, "username" : message.username, 
      	"status" : "Undefined", "online" : true, "location" : '', timestamp : ''});
      sockets[clientId] = socket;
      //printAllUsers()
    });

    // a user goes online
    socket.on('online', function (message) {
      goOnline(clientId, message.username);
      sockets[clientId] = socket;
      //printAllUsers()
    });

    // a user goes offline
    socket.on('logout', function (message) {
    	sockets.splice(clientId, 1);
        goOffline(clientId);
        //printAllUsers()
    });

    socket.on('disconnect', function () {
        sockets.splice(clientId, 1);
        goOffline(clientId);
        //printAllUsers()
    });

    socket.on('sendNewPublicMsg',function(message){
      console.log('Received a message from client');
      // emit to other clients
      socket.broadcast.emit('newPublicMsg', message);
      // emit back to sender
      socket.emit('newPublicMsg', message);
    });

    socket.on('sendNewPrivateMsg',function(message){
      getSocketIDByUserName(message.receiver, function(socket_id) {
        socket.emit('newPrivateMsg', socket_id, message);
      });
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', citizen);
app.use('/messages', messages);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

function goOnline(socket_id, username) {
	for(var i = 0; i < users.length; i++) {
		var person = users[i];
		if (person.username == username) {
			person.clientId = socket_id;
			person.online = true;
			break;
		}
	}
}

function goOffline(socket_id) {    
	for(var i = 0; i < users.length; i++) {
		var person = users[i];
		if (person.clientId == socket_id) {
			person.clientId = -1;
			person.online = false;
			break;
		}
	}
}

// for testing
function printAllUsers() {
	for(var i = 0; i < users.length; i++) {
		console.log(users[i]);
	}
}

function getSocketIDByUserName(name, callback) {
    for(var i = 0; i < users.length; i++) {
        var person = users[i];
        if (person.username == name) {
            return callback(person.clientId);
        }
    }
}

module.exports = app;
