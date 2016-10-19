'use strict';

var app = angular.module('ESNApp');
app.controller('ShareStatusCtrl', ['$scope','statusService','$location',
    function($scope, statusService, $location) {
        $scope.selfstatus = statusService.selfStatus;
        $scope.choseStatus = 'OK';
        $scope.shareStatus = function (statuscode) {
            statusService.updateStatus($scope.choseStatus);
        }
        $scope.setStatus = function (status) {
            $scope.choseStatus  = status;
        }
        this.share = function(){
            $location.path('sharestatus');
        }
    }]
);