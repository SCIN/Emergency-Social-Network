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
    $http.get('/citizen')
    .then(function(res){
      $scope.directory = res.data;
    });
  });
