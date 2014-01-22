function MapCtrl($scope) {
    $scope.initialize = function() {
        //initLat and initLng are calculated from the user's IP address
        var mapOptions = {
            center: new google.maps.LatLng(initLat, initLng),
            zoom: 14
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    };
};
