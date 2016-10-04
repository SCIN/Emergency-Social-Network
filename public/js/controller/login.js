app = angular.module('ESNApp', [
  'angular-md5'
  ]);

app.controller('LoginCtrl', ['$scope','$http', 'md5', function($scope, $http, md5) {
  $scope.login={};
  $scope.login.username="";
  $scope.login.password="";
  $scope.funcabc = function(){
    // $scope.loginpanel.password);
    alert(md5.createHash($scope.login.password));
  }
  $scope.onSubmit = function(){

  }
  $scope.checkUserName = function(){
    if($scope.loginpanel.username.$invalid){
      alert("Please provide another username.")
    } else if($scope.loginpanel.password.$invalid){
      alert("Please provide another password.")
    } else{
      $http.get('citizen/?username=' + $scope.login.username).then(function(response) {
        console.log(response.data);
        if(response.data.result){
          $scope.checkMatch();
        } else {
          $scope.register();
        }
      });
    }
  }
  $scope.checkMatch = function(){
    $http.get('authenticate/?username=' + $scope.login.username + '&password='+$scope.login.password).then(function(response) {
      console.log(response.data);
      if(response.data.result){
        $scope.onlogin();
      } else {
        alert('Please re-enter the username and/or password');
      }
    });
  }
  $scope.register = function(){
    $http.post('citizen/', {
      username: $scope.login.username,
      password: $scope.login.password
    }).then(function(response) {
      console.log(response.data);
      if(response.data.result){
        $scope.confirm();
      } else {
        alert('Please re-enter the username and/or password');
      }
    });
  }
  $scope.confirm = function(){
    if (confirm("Please confirm the creation of a new user") == true) {
        $http.post('citizen/', {
          online: true
        }).then(function(response) {
          console.log(response.data);
          if(response.data.result){
            $scope.onlogin();
          } else {
            alert('Erro! Please re-enter the username and/or password');
          }
        });
    } else {
        alert('You canceled! Please re-enter the username and/or password');
    }
  }
  $scope.onlogin = function(){
    alert('step 9')
  }
}]);
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