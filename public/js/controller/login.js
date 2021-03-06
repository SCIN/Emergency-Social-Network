'use strict';

var app = angular.module('ESNApp');

app.controller('LoginCtrl', ['$scope','$http', 'md5', 'usernameService', '$rootScope', '$location', 'socketioService','statusService',
  function($scope, $http, md5, usernameService, $rootScope, $location, socketioService,statusService) {
  $scope.login={};
  $scope.login.username="";
  $scope.login.password="";
  var mySocket = socketioService.getSocket();
  // check if the username already exists
  $scope.checkUserName = function(){
    if($scope.loginpanel.username.$invalid){
      alert("Please provide another username.")
    } else if($scope.loginpanel.password.$invalid){
      alert("Please provide another password.")
    } else{
      $http({
        method : 'GET',
        url : 'users/' + $scope.login.username
      }).success(function(data, status, headers, config) {
        console.log(data);
        $scope.checkMatch();
        }
      ).error(function (data, status, headers, config) {
        $scope.confirm();
      });
    }
  }
  // check if the password match the username
  $scope.checkMatch = function(){
    $http.get('users/authenticate/?username=' + $scope.login.username + '&password='+ md5.createHash($scope.login.password)).then(function(response) {
      console.log(response.data);
      if(response.data.result){
        $scope.login();
      } else {
        alert('Please re-enter the username and/or password');
      }
    });
  }
  // register the username
  $scope.register = function(){
    $http.post('users/', {
      username: $scope.login.username,
      password: md5.createHash($scope.login.password)
    }).then(function(response) {
      console.log(response.data);
      if(response.data.result){
        alert('Welcome to our emergency social network! Tips: You can share your status by selecting OK, Help or Emergency. OK:I am OK, I do not need help. Help:I need help, but this is not a life threatening emergency. Emergency:I need help now, as this is a life threatening emergency! (If you want to share your location with status, please use https connection!)');
        mySocket.emit("regist", {username: $scope.login.username});
        $scope.onlogin();
      } else {
        alert('Please re-enter the username and/or password');
      }
    });
  }
  // ask the user to choose if he/she confirm the register
  $scope.confirm = function(){
    if (confirm("Please confirm the creation of a new user") == true) {
      $scope.register();
    } else {
      alert('You canceled! Please re-enter the username and/or password');
    }
  }

  // login to the system
  $scope.login = function(){
    $http.post('users/online/', {
      username: $scope.login.username,
      online: true
    }).then(function(response) {
      console.log(response.data);
      if(response.data.result){
        $scope.onlogin();
      } else {
        alert('Erro! Failed to change online status!');
      }
    });
  }
  // actions after login
  $scope.onlogin = function(){
    usernameService.setUsername($scope.login.username);
    statusService.setUsername($scope.login.username);
    mySocket.emit("online",{username:$scope.login.username});
    $rootScope.$broadcast('status:login', {status: true}); 
    $location.path('announce');
  }
}
]);

app.directive('usernameDirective', function (){ 
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