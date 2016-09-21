var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// var server = http.createServer(app);
var port = 3000;
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});
app.use(express.static(__dirname + '/public')); // set the static files location
io.on('connection', function(socket){
  console.log("connect");
  socket.on('chatmessage', function(msg){
    io.emit('chatshow', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:3000');
});
