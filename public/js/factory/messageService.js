'use strict';

angular.module('ESNApp')
    .factory('MessageService', function () {
        function createMsg(text, timestamp, sender, status, location) {
            var message = {
                text: text,
                sender: sender,
                status: status,
                location: location
            };
            return  message;
        }

        return{
            createMsg: createMsg
        };
    });