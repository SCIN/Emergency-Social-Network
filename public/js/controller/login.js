'use strict';

var app = angular.module('ESNApp');
app.controller('LoginCtrl', ['$scope','$http', 'md5', 'usernameService', '$state',
  function($scope, $http, md5, usernameService, $state) {
  $scope.login={};
  $scope.login.username="";
  $scope.login.password="";
  // check if the username already exists
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
          $scope.confirm();
        }
      });
    }
  }
  // check if the password match the username
  $scope.checkMatch = function(){
    $http.get('authenticate/?username=' + $scope.login.username + '&password='+ md5.createHash($scope.login.password)).then(function(response) {
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
    $http.post('citizen/', {
      username: $scope.login.username,
      password: md5.createHash($scope.login.password)
    }).then(function(response) {
      console.log(response.data);
      if(response.data.result){
        $scope.login();
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
    $http.post('citizen/online/', {
      username: $scope.login.username,
      online: true
    }).then(function(response) {
      console.log(response.data);
      if(response.data.result){
        $scope.onlogin();
      } else {
        alert('Erro! Please re-enter the username and/or password');
      }
    });
  }
  // actions after login
  $scope.onlogin = function(){
    $state.go('main');
    usernameService.setUsername($scope.login.username);
  }
}]);