'use strict';
(function(){
  var app = angular.module('ESNApp');
  app.controller('navCtrl', function ($scope) {
    $scope.loggedin = false;
    $scope.$on('status:login',function(obj, data){
      $scope.loggedin = data.status;
    });
  });
})();
