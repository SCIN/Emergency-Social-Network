'use strict';

angular.module('ESNApp')
    .controller('PublicWallCtrl', ['$scope', 'MessageService', function ($scope,MessageService) {
        $scope.mySocket = io.connect();
        $scope.msgs = [];
        $scope.message = "";
        $scope.post = function () {
            console.log("send");
            mySocket.emit('publicMessage', $scope.message);
            $scope.message = '';
        }
        mySocket.on('showPublicWall', function(msg){
            console.log("received");
            $scope.$apply(function () {
                $scope.msgs.push({text:msg});
            });
        });
    }]);
