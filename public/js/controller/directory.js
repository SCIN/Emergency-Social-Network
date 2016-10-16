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
  app.controller('DirectoryCtrl',['$scope', 'socketioService', function ($scope, $http, socketioService) {
    $scope.directory = [];
    $scope.hide = true;
    $scope.mySocket = socketioService.getSocket();
    $scope.mySocket.on('refreshDirectory', function(newDirectory){
      $scope.$apply(function () {
        $scope.directory = newDirectory;
      });
    });
  });
})();
