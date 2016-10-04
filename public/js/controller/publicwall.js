'use strict';

angular.module('ESNApp')
    .controller('PublicWallCtrl', ['$scope', 'MessageService','$http','usernameService', function ($scope,MessageService,$http,usernameService) {
        $scope.msgs = [];
        $http({
            method : 'GET',
            url : 'publicMessage',
        }).success(function(data, status, headers, config) {
                    for (var i = 0; i < data.length; i++) {
                        $scope.msgs.push(data[i]);
                    }
        }).error(function(data, status, headers, config) {
            console.log(status);
        });
        $scope.message = "";
        $scope.mySocket = io();
        $scope.post = function () {
            var msg = MessageService.createMsg($scope.message, usernameService.getUsername(), "emergency","Building 19");
            $http({
                method : 'POST',
                url : 'publicMessage',
                params: msg
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
