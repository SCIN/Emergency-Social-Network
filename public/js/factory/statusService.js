var app = angular.module('ESNApp');

// share the username among the controllers
app.service('statusService',['$http',  function ($http) {
    var address = '';
    var selfStatus =
    function updateAddress() {
        if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);
    }

    function onPositionUpdate(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&sensor=true";
        $http.get(url)
            .then(function(result) {
                address = result.data.results[2].formatted_address;
                // console.log(address);
            });
    }
    return {
        updateAddress: updateAddress,
        getAddress: function() {
            return address;
        }
    };
}]);