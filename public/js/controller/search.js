'use strict';

(function () {
    var app = angular.module('ESNApp');
    app.controller('SearchCtrl', ['$scope', '$http', 'socketioService', 'statusService', function ($scope, $http, socketioService, statusService) {
    $scope.queryMsg = "";

    // searched results
    $scope.citizens = [{ username: 'user-a', location: 'Mountain View', timestamp: new Date(), status: 'Ok', }];
    $scope.publicMessages = [{ sender: 'sender-a', location: 'Mountain View', timestamp: new Date(), status: 'Ok', text: 'sample text', }];
    $scope.privateMessages = [{ sender: 'sender-a', receiver: 'receiver-b', location: 'Mountain View', timestamp: new Date(), status: 'Ok', text: 'sample text', }];
    $scope.announcements = [{ sender: 'sender-a', location: 'Mountain View', timestamp: new Date(), status: 'Ok', text: 'sample announcement text',}];

    // private methods
    $scope.searchCitizensByName = function(query, isNewSearch){
      $http({
        method : 'GET',
        url : 'search/name/' + query,
        data: {
          count: isNewSearch ? 1 : $scope.citizens.length + 1,
        },
      }).success(function(data){
        $scope.citizens = isNewSearch ? data : $scope.citizens.concat(data);
      }).error(function(data, status) {
        console.log(status);
      });
    };
    $scope.searchCitizensByStatus = function(query, isNewSearch){
      $http({
        method : 'GET',
        url : 'search/status/' + query,
        data: {
          count: isNewSearch ? 1 : $scope.citizens.length + 1,
        },
      }).success(function(data){
        $scope.citizens = isNewSearch ? data : $scope.citizens.concat(data);
      }).error(function(data, status) {
        console.log(status);
      });
    };
    $scope.searchPublicMessages = function(query, isNewSearch){
      var words = $scope.splitWords(query);
      $http({
        method : 'GET',
        url : 'search/public',
        data: {
          count: isNewSearch ? 1 : $scope.publicMessages.length + 1,
          words: words,
        },
      }).success(function(data){
        $scope.publicMessages = isNewSearch ? data : $scope.publicMessages.concat(data);
      }).error(function(data, status) {
        console.log(status);
      });
    };
    $scope.searchPrivateMessages = function(query, isNewSearch){
      var words = $scope.splitWords(query);
      $http({
        method : 'GET',
        url : 'search/private',
        data: {
          count: isNewSearch ? 1 : $scope.privateMessages.length + 1,
          words: words,
        },
      }).success(function(data) {
        $scope.privateMessages = isNewSearch ? data : $scope.privateMessages.concat(data);
      }).error(function(data, status) {
        console.log(status);
      });
    };
    $scope.searchAnnouncements = function(query, isNewSearch){
      var words = $scope.splitWords(query);
      $http({
        method : 'GET',
        url : 'search/announcements',
        data: {
          count: isNewSearch ? 1 : $scope.announcements.length + 1,
          words: words,
        },
      }).success(function(data) {
        $scope.announcements = isNewSearch ? data : $scope.announcements.concat(data);
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

        // main entrypoint for searching
        $scope.search = function(){
          $scope[$scope.type]($scope.queryMsg);
          $scope.queryMsg = "";
        };

        $scope.typeTips = {
            searchCitizensByName: 'Search Users by Username (Or Part of User Name)',
            searchCitizensByStatus: 'Search Users by User Status',
            searchPublicMessages: 'Search Public Messages by Key Words',
            searchPrivateMessages: 'Search Your Private Messages by Key Words',
            searchAnnouncements: 'Search Announcement by Key Words '
        };
        $scope.types = ['searchCitizensByName', 'searchCitizensByStatus', 'searchPublicMessages', 'searchPrivateMessages', 'searchAnnouncements'];
        $scope.type = $scope.types[0];
        $scope.getIconClass = function (status) {
            return statusService.getIconClass(status);
        };

        $scope.getIconClass = function (status) {
            return statusService.getIconClass(status);
        };
    }]);
})();

