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
  app.controller('AlertCtrl',['$scope', 'alertService',
    function ($scope, alertService) {
    $scope.$watch(function () {
      return alertService.getBody();
    }, function() {
      $scope.body = alertService.getBody();
      $scope.level = alertService.getLevel();
    });
    $scope.getClass = function(){
      return {
        'alert-info': $scope.level == 'alert-info',
        'alert-danger': $scope.level == 'alert-danger',
      }
    };
    $scope.clear = function(){
      alertService.clear();
    };
  }]);
})();
