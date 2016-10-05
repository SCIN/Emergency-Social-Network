var app = angular.module('ESNApp');

// share the username among the controllers
app.service('usernameService', function () {
    var username = 'First';
    return {
        getUsername: function () {
            return username;
        },
        setUsername: function(value) {
            username = value;
        }
    };
});