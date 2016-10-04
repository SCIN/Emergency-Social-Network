'use strict';

angular.module('ESNApp')
    .factory('MessageService', function () {
        function createMsg(text, sender, status, location) {
            var d = new Date();
            var message = {
                text: text,
                sender: sender,
                status: status,
                timestamp: d.toLocaleTimeString()+' '+d.toLocaleDateString(),
                // messageId: messageId,
                location: location
            };
            return  message;
        }

        return{
            createMsg: createMsg
        };
    });