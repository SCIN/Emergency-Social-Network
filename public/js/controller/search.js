'use strict';

(function () {
    var app = angular.module('ESNApp');
    app.controller('SearchCtrl', ['$scope', '$http', 'socketioService', 'statusService', function ($scope, $http, socketioService, statusService) {
        $scope.msgs = [];

        // searched results
        $scope.citizens = [];
        $scope.publicMessages = [];
        $scope.privateMessages = [];

        // private methods
        $scope.searchCitizens = function (query) {
            $scope.citizens = [{
                username: 'user-a',
                location: 'Mountain View',
                timestamp: new Date(),
                status: 'Ok',
            }];
        };
        $scope.searchPublicMessages = function (query) {
            var words = $scope.splitWords(query);
            $scope.publicMessages = [{
                sender: 'sender-a',
                location: 'Mountain View',
                timestamp: new Date(),
                status: 'Ok',
                text: 'sample text',
            }];
        };
        $scope.searchPrivateMessages = function (query) {
            var words = $scope.splitWords(query);
            $scope.privateMessages = [{
                sender: 'sender-a',
                receiver: 'receiver-b',
                location: 'Mountain View',
                timestamp: new Date(),
                status: 'Ok',
                text: 'sample text',
            }];
        };

        $scope.splitWords = function (query) {
            var words = query.split(/[^a-zA-Z]/);
            return words.filter(function (word) {
                return word && !$scope.isStopWord(word);
            });
        };

        $scope.isStopWord = function (word) {
            var stopWords = ["a", "able", "about", "across", "after", "all",
                "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at",
                "be", "because", "been", "but", "by", "can", "cannot", "could", "dear",
                "did", "do", "does", "either", "else", "ever", "every", "for", "from",
                "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his",
                "how", "however", "i", "if", "in", "into", "is", "it", "its", "just",
                "least", "let", "like", "likely", "may", "me", "might", "most", "must",
                "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only",
                "or", "other", "our", "own", "rather", "said", "say", "says", "she",
                "should", "since", "so", "some", "than", "that", "the", "their", "them",
                "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us",
                "wants", "was", "we", "were", "what", "when", "where", "which", "while",
                "who", "whom", "why", "will", "with", "would", "yet", "you", "your"];
            return stopWords.indexOf(word) >= 0;
        };

        $scope.typeTips = {
            userByName: 'Search Users by Username (Or Part of User Name)',
            userByStatus: 'Search Users by User Status',
            publicMsg: 'Search Public Messages',
            privateMsg: 'Search Your Private Messages',
            announcements: 'Search Announcements'
        };
        $scope.types = ['userByName', 'userByStatus', 'publicMsg', 'privateMsg', 'announcements'];
        $scope.type = $scope.types[0];
        $scope.getIconClass = function (status) {
            return statusService.getIconClass(status);
        };
        $scope.mySocket = socketioService.getSocket();
        $scope.getIconClass = function (status) {
            return statusService.getIconClass(status);
        };
    }]);
})();

