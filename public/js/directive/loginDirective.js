var app = angular.module('ESNApp');

// the rule of the user name
app.directive('loginDirective', function (){ 
  return {
    require: 'ngModel',
    link: function(scope, elem, attr, ngModel) {
      var blacklist = attr.blacklist.split(' ');
      ngModel.$parsers.unshift(function(value) {
       var valid = blacklist.indexOf(value) === -1 &&(!value  || value.length >2);
       ngModel.$setValidity('ddd', valid);
       return valid ? value : undefined;
     });
    }
  };
});

// the rule of the password
app.directive('passwordDirective', function (){ 
  return {
    require: 'ngModel',
      link: function(scope, elem, attr, ngModel) {
        ngModel.$parsers.unshift(function(value) {
         var valid = !value  || value.length >3;
         ngModel.$setValidity('length', valid);
         return valid ? value : undefined;
       });
      }
  };
});