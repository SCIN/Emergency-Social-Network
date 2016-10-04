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
  app.controller('LoginController', ['$state', function ($state) {
    this.click = function(){
      $state.go('main');
    };
  }]);
})();
