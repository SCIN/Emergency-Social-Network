'use strict';

/**
 * @ngdoc function
 * @name sampleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sampleApp
 */
(function(){
  var app = angular.module('ESNApp');
  app.controller('sidebarLeftCtrl', ['$scope','$http', 'usernameService', function ($scope, $http, usernameService) {
  	$scope.loggedin = false;
    $scope.$on('status:login',function(obj, data){
    	$scope.loggedin = data.status;
        $scope.username = usernameService.getUsername();
    });
  }]);
})();
