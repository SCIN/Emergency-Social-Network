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
  app.controller('DirectoryCtrl',['$scope', 'socketioService','$http','$location','$rootScope', 'chatService', 'statusService', 'alertService',
    function ($scope, socketioService, $http, $location, $rootScope, chatService, statusService, alertService) {
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
        // if the sender is who we are talking to => do not update unread numbers
        if (chatService.getTargetName() == msg.sender) return;
        alertService.alert('new message from ' + msg.sender, 'alert-info');
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
      // clear up all the unread numbers for the person we are about to talk to
      $scope.directory.forEach(function(citizen){
        if (citizen.username == data.username){
          citizen.unread = 0;
        }
      });
    };
    $scope.getIconClass = function(status){
      return statusService.getIconClass(status);
    };
  }]);
})();
