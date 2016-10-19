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
  app.controller('DirectoryCtrl',['$scope', 'socketioService','$http','$location','$rootScope', 'statusService',
    function ($scope, socketioService, $http, $location, $rootScope, statusService) {
    $scope.directory = [];
    $scope.hide = true;
    $scope.mySocket = socketioService.getSocket();
    $scope.mySocket.on('refreshDirectory', function(newDirectory){
      $scope.$apply(function () {
        console.log(newDirectory);
        $scope.directory = newDirectory;
      });
    });
    this.chat = function(data){
      $rootScope.$broadcast('chat:private', {username: data.username}); 
      $location.path('private');
    };
    $scope.getIconClass = function(status){
      return statusService.getIconClass(status);
    };
  }]);
})();
