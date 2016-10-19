var app = angular.module('ESNApp');

// share the username among the controllers
app.service('socketioService', function () {
    var mysocket = io();
    return{
        getSocket:function () {
            return mysocket;
        }
    }
});
