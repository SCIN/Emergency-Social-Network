var app = angular.module('ESNApp');

// share the username among the controllers
app.service('statusService',['$http', 'socketioService',  function ($http,socketioService) {
    var mySocket = socketioService.getSocket();
    var selfStatus = {
        statusCode:'Undefined',
        location:'unknown',
        userName:'User',
        timeStamp:'unknown'
    }

    function updateStatus(statusCode) {
        var d = new Date();
        selfStatus.timeStamp = d.toLocaleTimeString()+' '+d.toLocaleDateString();
        selfStatus.statusCode = statusCode;
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate,postStatus,{timeout:1000})
            else postStatus();

    }

    //havn't tested this function
    function postStatus() {
        $http({
            method : 'POST',
            url :" /users/"+ selfStatus.userName + "/status/"+ selfStatus.statusCode,
            data: selfStatus
        }).success(function(data, status, headers, config) {
            console.log(status);
        }).error(function(data, status, headers, config) {
            console.log(status);
        });
        mySocket.emit("shareStatus", selfStatus);
    }

    // is this useful?
    function errorCallback(){

    }

    function onPositionUpdate(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
        $http.get(url)
            .then(function(result) {
                selfStatus.location = result.data.results[2].formatted_address;
            }).then(postStatus());
        // error handling?
    }

    return {
        updateStatus: updateStatus,
        getLocation: function() {
            return selfStatus.location;
        },
        getStatusCode:function () {
            return selfStatus.statusCode;
        },
        selfStatus: selfStatus,
        setUsername:function (Username) {
            selfStatus.userName = Username;
        },
        getIconClass: function(status) {
          return {
            // maybe just :
            // 'label-default': status == 'Undefined'
            'label-danger': (status || '').toLowerCase() == 'emergency',
            'label-success': (status || '').toLowerCase() == 'ok',
            'label-warning': (status || '').toLowerCase() == 'help',
            'label-default': (status || '').toLowerCase() == 'undefined',
          };
        },
    };
}]);
