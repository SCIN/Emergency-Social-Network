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
  // var app = angular.module('ESNApp', ['ui.bootstrap', 'ui.router', 'angular-md5']);
  // app.config(function($stateProvider, $urlRouterProvider){
  //   $urlRouterProvider.otherwise('/login');
  //   var loginState = {
  //     name: 'login',
  //     url: '/login',
  //     templateUrl: 'views/login.html',
  //   };
  //   var mainState = {
  //     name: 'main',
  //     url: '/main',
  //     templateUrl: 'views/main.html',
  //   };
  //   $stateProvider.state(loginState);
  //   $stateProvider.state(mainState);
  // });

  var app = angular.module('ESNApp', [
    'ngRoute',
    'mobile-angular-ui',

    // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'.
    // This is intended to provide a flexible, integrated and and
    // easy to use alternative to other 3rd party libs like hammer.js, with the
    // final pourpose to integrate gestures into default ui interactions like
    // opening sidebars, turning switches on/off ..
    'mobile-angular-ui.gestures', 'angular-md5'
  ]);
  app.config(function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'views/login.html', reloadOnSearch: false});
  });


})();
