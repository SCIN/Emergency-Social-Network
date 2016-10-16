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
  app.controller('LogoutController', ['$http', 'usernameService', function ($http, usernameService) {
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
      // $state.go('login');
    };
  }]);
})();
