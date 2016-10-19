var app = angular.module('ESNApp');

// share the username among the controllers
app.service('chatService', function () {
    var targetName = '';
    return {
        getTargetName: function () {
            return targetName;
        },
        setTargetName: function(value) {
            targetName = value;
        }
    };
});