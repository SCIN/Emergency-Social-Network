'use strict';

/**
 * @ngdoc overview
 * @name sampleApp
 * @description
 * # sampleApp
 *
 * Main module of the application.
 */
(function(){
  var app = angular.module('ESNApp', ['ui.bootstrap', 'ui.router']);
  app.config(function($stateProvider){
    var loginState = {
      name: 'login',
      url: '/login',
      templateUrl: 'views/login.html',
    };
    var mainState = {
      name: 'main',
      url: '/main',
      templateUrl: 'views/main.html',
    };
    $stateProvider.state(loginState);
    $stateProvider.state(mainState);
  });
})();
