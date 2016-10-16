'use strict';

angular.module('ESNApp')
    .controller('PrivateChatCtrl', ['$scope', 'MessageService','$http','socketioService', function ($scope,MessageService,$http,socketioService) {
        $scope.msgs = [];
        $scope.receiver = "Bob";
        $scope.getAllMessages = function(){
            $http({
                method : 'GET',
                url : 'messages/private'
            }).success(function(data, status, headers, config) {
                for (var i = 0; i < data.length; i++) {
                    $scope.msgs.push(data[i]);
                }
            }).error(function(data, status, headers, config) {
                console.log(status);
            });
        }

        $scope.message = "";

        $scope.mySocket = socketioService.getSocket();
        $scope.post = function () {
            var msg = MessageService.createPrivateMsg($scope.message, $scope.receiver);
            $http({
                method : 'POST',
                url : 'messages/private',
                data: msg
            }).success(function(data, status, headers, config) {
                console.log(status);
            }).error(function(data, status, headers, config) {
                console.log(status);
            });
            $scope.mySocket.emit('sendNewPrivateMsg',msg);
            $scope.msgs.push(msg);
        }
        $scope.mySocket.on('newPrivateMsg', function(msg){
            console.log(msg);
            $scope.$apply(function () {
                $scope.msgs.push(msg);
            });
        });
    }]);