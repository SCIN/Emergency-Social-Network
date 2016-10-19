'use strict';

(function(){
  var app = angular.module('ESNApp');
  app.service('alertService', function () {
    var body = '';
    var level = ''; // 
    return {
      getBody: function () {
        return body;
      },
      getLevel: function(){
        return level;
      },
      alert: function(message, alertLevel){
        body = message;
        level = alertLevel;
        // clear after 3 seconds;
        setTimeout(function(){
          body = '';
          level = '';
        }, 3000);
      },
      clear: function(){
        body = '';
        level = '';
      },
    };
  });
})();