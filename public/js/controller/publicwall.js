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

        $scope.address = '';
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);
        function onPositionUpdate(position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
            $http.get(url)
                .then(function(result) {
                    var address = result.data.results[2].formatted_address;
                    $scope.address = address;
                });
        }

        $scope.mySocket = io();
        $scope.post = function () {
            var msg = MessageService.createMsg($scope.message, usernameService.getUsername(), "emergency",$scope.address);
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
