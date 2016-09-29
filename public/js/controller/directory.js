'use strict';

/**
 * @ngdoc function
 * @name sampleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sampleApp
 */
angular.module('ESNApp')
  .controller('DirectoryCtrl', function ($scope, $http) {
    $scope.happy = 'fun';
    $http.get('/users')
    .then(function(res){
      $scope.happy = res.data;
    });
  });
