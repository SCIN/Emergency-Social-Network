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
  app.controller('DirectoryCtrl', function ($http) {
    var self = this;
    self.directory = [];
    self.hide = true;

    self.refresh = function(){
      $http.get('/citizen')
      .then(function(res){
        self.directory = res.data;
      });
    };

    self.refresh();
  });
})();
