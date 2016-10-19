'use strict';

angular.module('ESNApp')
    .controller('PrivateChatCtrl', ['$scope', 'MessageService','$http','socketioService','usernameService', 'chatService', 
        function ($scope,MessageService,$http,socketioService,usernameService, chatService) {
        $scope.msgs = [];
        $scope.receiver = chatService.getTargetName();

        $scope.$on('chat:private', function(obj, data){
            console.log(obj);
            console.log(data);
            $scope.receiver = data.username;
            $scope.getHistoryMessages();
        });

        $scope.getHistoryMessages = function(){
            $http({
                method : 'GET',
                url : 'messages/private/'+ $scope.receiver + '/' + usernameService.getUsername()
            }).success(function(data, status, headers, config) {
                $scope.msgs = data;
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
            $scope.$apply(function () {
                if(msg.sender === $scope.receiver) {
                    $scope.msgs.push(msg);
                }
            });
        });
    }]);