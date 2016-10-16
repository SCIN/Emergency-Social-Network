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
  app.controller('LogoutController', ['$state', '$http', 'usernameService','socketioService', function ($state, $http, usernameService,socketioService) {
    var mySocket = socketioService.getSocket();
    this.click = function(){
      // login to the system
      $http.post('users/online/', {
        username: usernameService.getUsername(),
        online: false,
      }).then(function(response) {
        if(!response.data.result){
          alert('Fail to logout at server');
        }
      });
      mySocket.emit("logout", {username: usernameService.getUsername()});
      $state.go('login');
    };
  }]);
})();
