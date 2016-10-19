'use strict';

var app = angular.module('ESNApp');
app.controller('ShareStatusCtrl', ['$scope','statusService','$location',
    function($scope, statusService, $location) {
        $scope.selfstatus = statusService.selfStatus;
        $scope.shareStatus = function (statuscode) {
            statusService.updateStatus(statuscode);
        }
        this.share = function(){
            $location.path('sharestatus');
        }
    }]
);