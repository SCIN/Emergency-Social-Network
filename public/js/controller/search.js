'use strict';

angular.module('ESNApp')
    .controller('SearchCtrl', ['$scope','$http','socketioService', function ($scope,$http,socketioService) {
        $scope.msgs = [];

        $scope.message = "";

        $scope.mySocket = socketioService.getSocket();
        $scope.mySocket.on('newPublicMsg', function(msg){
            console.log("received");
            $scope.$apply(function () {
                $scope.msgs.push(msg);
            });
        });
        $scope.getIconClass = function(status){
            return statusService.getIconClass(status);
        };
    }]);
