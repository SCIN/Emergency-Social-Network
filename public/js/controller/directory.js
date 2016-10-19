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
  app.controller('DirectoryCtrl',['$scope', 'socketioService','$http','$location','$rootScope', 'chatService', 'statusService',
    function ($scope, socketioService, $http, $location, $rootScope, chatService, statusService) {
    $scope.directory = [];
    $scope.hide = true;
    $scope.mySocket = socketioService.getSocket();
    $scope.mySocket.on('refreshDirectory', function(newDirectory){
      $scope.$apply(function () {
        $scope.directory = newDirectory;
      });
    });
    $scope.mySocket.on('newPrivateMsg', function(msg){
      $scope.$apply(function(){
        $scope.directory.forEach(function(citizen){
          if (citizen.username == msg.sender){
            citizen.unread++;
            citizen.unread = citizen.unread || 1; // if unread is undefined => set to 1
          }
        });
      });
    });
    this.chat = function(data){
      chatService.setTargetName(data.username);
      $rootScope.$broadcast('chat:private', {username: data.username}); 
      $location.path('private');
    };
    $scope.getIconClass = function(status){
      return statusService.getIconClass(status);
    };
  }]);
})();
