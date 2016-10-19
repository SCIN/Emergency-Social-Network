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
  app.controller('DirectoryCtrl',['$scope', 'socketioService','$http','$location','$rootScope', 'chatService',
    function ($scope, socketioService, $http, $location, $rootScope, chatService) {
    $scope.directory = [];
    $scope.hide = true;
    $scope.mySocket = socketioService.getSocket();
    $scope.mySocket.on('refreshDirectory', function(newDirectory){
      $scope.$apply(function () {
        $scope.directory = newDirectory;
      });
    });
    this.chat = function(data){
      chatService.setTargetName(data.username);
      $rootScope.$broadcast('chat:private', {username: data.username}); 
      $location.path('private');
    }
  }]);
})();
