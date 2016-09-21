var app = angular.module('myapp', ['ngAnimate', 'ngSanitize']);
app.controller('chat', function ($scope) {
    var SERVER = 'http://localhost:3000';
    var mySocket = io.connect(SERVER);
    $scope.msgs = [];
    $scope.send = function () {
        console.log("send");
        mySocket.emit('chatmessage', $scope.message);
        $scope.message = '';
        return false;
    }
    mySocket.on('chatshow', function(msg){
        console.log("received");
        $scope.msgs.push({text:msg});
    });
})
