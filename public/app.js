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
  var app = angular.module('ESNApp', ['ui.bootstrap', 'ui.router', 'angular-md5']);
  app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/login');
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
