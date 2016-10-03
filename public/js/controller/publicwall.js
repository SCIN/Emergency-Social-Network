'use strict';

angular.module('ESNApp')
    .controller('PublicWallCtrl', ['$scope', 'MessageService','$http', function ($scope,MessageService,$http) {
        $scope.msgs = [];
        $scope.message = "";

        $scope.post = function () {
            $http({
                method : 'POST',
                url : 'public-post',
                params: MessageService.createMsg("test post", "dizhu", "emergency","Building 19")
            }).success(function(data, status, headers, config) {
                console.log(status);
            }).error(function(data, status, headers, config) {
                console.log(status);
            });
        }

        $scope.mySocket = io.connect();
        $scope.mySocket.on('newPublicMsg', function(msg){
            console.log("received");
            $scope.$apply(function () {
                $scope.msgs.push({text:msg});
            });
        });
    }]);
