'use strict';

angular.module('ESNApp')
    .controller('PublicWallCtrl', ['$scope', 'MessageService','$http','usernameService','socketioService', function ($scope,MessageService,$http,usernameService,socketioService) {
        $scope.msgs = [];
        $scope.getAllMessages = function(){
            $http({
                method : 'GET',
                url : 'messages/public',
            }).success(function(data, status, headers, config) {
                        for (var i = 0; i < data.length; i++) {
                            $scope.msgs.push(data[i]);
                        }
            }).error(function(data, status, headers, config) {
                console.log(status);
            });
        }
        $scope.getAllMessages();
        
        $scope.message = "";

        $scope.mySocket = socketioService.getSocket();
        $scope.post = function () {
            var msg = MessageService.createMsg($scope.message, usernameService.getUsername(), "emergency");
            $http({
                method : 'POST',
                url : 'messages/public',
                data: msg
            }).success(function(data, status, headers, config) {
                console.log(status);
            }).error(function(data, status, headers, config) {
                console.log(status);
            });
            $scope.mySocket.emit('sendNewPublicMsg',msg);
        }
        $scope.mySocket.on('newPublicMsg', function(msg){
            console.log("received");
            $scope.$apply(function () {
                $scope.msgs.push(msg);
            });
        });
    }]);
