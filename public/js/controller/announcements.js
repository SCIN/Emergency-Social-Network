'use strict';

angular.module('ESNApp')
    .controller('AnnouncementCtrl', ['$scope', 'MessageService','$http','socketioService', 'statusService', function ($scope,MessageService,$http,socketioService, statusService) {
        $scope.msgs = [];
        $scope.getAllMessages = function(){
            $http({
                method : 'GET',
                url : '/messages/announcements'
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
            var msg = MessageService.createAnnounce($scope.message);
            $http({
                method : 'POST',
                url : '/messages/announcements',
                data: msg
            }).success(function(data, status, headers, config) {
                console.log(status);
            }).error(function(data, status, headers, config) {
                console.log(status);
            });
            $scope.mySocket.emit('sendAnnouncement',msg);
        }
        $scope.mySocket.on('newAnnouncement', function(msg){
            console.log("received");
            $scope.$apply(function () {
                $scope.msgs.push(msg);
            });
        });
        $scope.getIconClass = function(status){
          return statusService.getIconClass(status);
        };
    }]);
