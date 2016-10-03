'use strict';

angular.module('ESNApp')
    .factory('MessageService', function () {
        function createMsg(text, sender, status, location) {
            var message = {
                text: text,
                sender: sender,
                status: status,
                // timestamp: timestamp,
                // messageId: messageId,
                location: location
            };
            return  message;
        }

        return{
            createMsg: createMsg
        };
    });