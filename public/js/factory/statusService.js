var app = angular.module('ESNApp');

// share the username among the controllers
app.service('statusService',['$http',  function ($http) {

    var selfStatus = {
        statusCode:'Undefined',
        location:'unknown',
        userName:'User',
        timeStamp:'unknown'
    }
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);

    function updateStatus(statusCode) {
        var d = new Date();
        selfStatus.timeStamp = d.toLocaleTimeString()+' '+d.toLocaleDateString();
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);
    }

    function onPositionUpdate(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
        $http.get(url)
            .then(function(result) {
                selfStatus.location = result.data.results[2].formatted_address;
            });
    }
    return {
        updateStatus: updateStatus,
        getLocation: function() {
            return selfStatus.location;
        },
        getStatusCode:function () {
            return selfStatus.statusCode;
        },
        getStatus:function () {
            return selfStatus;
        },
        setUsername:function (Username) {
            selfStatus.userName = Username;
        }
    };
}]);