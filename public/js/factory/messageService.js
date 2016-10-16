'use strict';

angular.module('ESNApp')
    .factory('MessageService', ['statusService','usernameService', function(statusService, usernameService) {
        function createPubMsg(text) {
            var d = new Date();
            var sender = usernameService.getUsername();
            var add = statusService.getLocation();
            var status = statusService.getStatusCode();
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

        function createPrivateMsg(text, receiver) {
            var d = new Date();
            var sender = usernameService.getUsername();
            var add = statusService.getLocation();
            var status = statusService.getStatusCode();
            var message = {
                text: text,
                sender: sender,
                status: status,
                timestamp: d.toLocaleTimeString()+' '+d.toLocaleDateString(),
                receiver: receiver,
                location: add
            };
            return  message;
        }

        return{
            createPubMsg: createPubMsg,
            createPrivateMsg: createPrivateMsg
        };
    }]);