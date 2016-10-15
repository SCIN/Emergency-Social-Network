'use strict';

angular.module('ESNApp')
    .factory('MessageService', ['statusService', function(statusService) {
        function createMsg(text, sender, status) {
            var d = new Date();
            // statusService.updateAddress();
            var add = statusService.getLocation();
            var message = {
                text: text,
                sender: sender,
                status: status,
                timestamp: d.toLocaleTimeString()+' '+d.toLocaleDateString(),
                // messageId: messageId,
                location: add
            };
            return  message;
        }

        return{
            createMsg: createMsg
        };
    }]);