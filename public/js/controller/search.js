'use strict';

(function () {
    var app = angular.module('ESNApp');
    app.controller('SearchCtrl', ['$scope', '$http', 'socketioService', 'statusService', function ($scope, $http, socketioService, statusService) {
        $scope.msgs = [];

    // searched results
    $scope.citizens = [{ username: 'user-a', location: 'Mountain View', timestamp: new Date(), status: 'Ok', }];
    $scope.publicMessages = [{ sender: 'sender-a', location: 'Mountain View', timestamp: new Date(), status: 'Ok', text: 'sample text', }];
    $scope.privateMessages = [{ sender: 'sender-a', receiver: 'receiver-b', location: 'Mountain View', timestamp: new Date(), status: 'Ok', text: 'sample text', }];
    $scope.announcements = [{ sender: 'sender-a', location: 'Mountain View', timestamp: new Date(), status: 'Ok', text: 'sample announcement text',}];

    // private methods
    $scope.searchCitizensByName = function(query){
      $http({
        method : 'GET',
        url : 'search/name/' + query,
      }).success(function(data){
        $scope.citizens = data;
      }).error(function(data, status) {
        console.log(status);
      });
    };
    $scope.searchCitizensByStatus = function(query){
      $http({
        method : 'GET',
        url : 'search/status/' + query,
      }).success(function(data){
        $scope.citizens = data;
      }).error(function(data, status) {
        console.log(status);
      });
    };
    $scope.searchPublicMessages = function(query){
      var words = $scope.splitWords(query);
      $http({
        method : 'GET',
        url : 'search/public',
        data: {
          count: $scope.publicMessages.length + 1,
          words: words,
        },
      }).success(function(data){
        $scope.publicMessages = data;
      }).error(function(data, status) {
        console.log(status);
      });
    };
    $scope.searchPrivateMessages = function(query){
      var words = $scope.splitWords(query);
      $http({
        method : 'GET',
        url : 'search/private',
        data: {
          count: $scope.privateMessages.length + 1,
          words: words,
        },
      }).success(function(data) {
        $scope.privateMessages = data;
      }).error(function(data, status) {
        console.log(status);
      });
    };
    $scope.searchAnnouncements = function(query){
      var words = $scope.splitWords(query);
      $http({
        method : 'GET',
        url : 'search/announcements',
        data: {
          count: $scope.announcements.length + 1,
          words: words,
        },
      }).success(function(data) {
        $scope.announcements = data;
      }).error(function(data, status) {
        console.log(status);
      });
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

        $scope.searchStrategies = ['searchCitizensByName', 'searchCitizensByStatus', 'searchPublicMessages', 'searchPrivateMessages', 'searchAnnouncements'];

        // main entrypoint for searching
        $scope.search = function(query){
          $scope[$scope.searchStrategies[$scope.type]](query);
        };

        $scope.typeTips = {
            userByName: 'Search Users by Username (Or Part of User Name)',
            userByStatus: 'Search Users by User Status',
            publicMsg: 'Search Public Messages by Key Words',
            privateMsg: 'Search Your Private Messages by Key Words',
            announcements: 'Search Announcement by Key Words '
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

