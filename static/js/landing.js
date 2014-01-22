function MapCtrl($scope, $http) {
    $scope.initialize = function() {
        //initLat and initLng are calculated from the user's IP address
        $scope.mapOptions = {
            center: new google.maps.LatLng(initLat, initLng),
            zoom: 14
        };
        $scope.map = new google.maps.Map(document.getElementById("map-canvas"), $scope.mapOptions);

    };

    $scope.addLocationMarker = function(lat, lng, title, center) {
        var latLng = new google.maps.LatLng(lat, lng);
        var marker = new google.maps.Marker({
            position: latLng,
            map: $scope.map,
            title: title
        });
        if (center) {
            $scope.map.setCenter(latLng);
        }
        return marker;
    };
};

function AddressCtrl($scope, $http) {
    $scope.address = '';
    $scope.addressMarker = null;

    $scope.addAddressMarker = function() {
        // Clear out old address and markers.
        $scope.clear();

        var url = 'http://maps.googleapis.com/maps/api/geocode/json';
        var args = {'address': $scope.address,
                    'sensor': false};

        $http.get(url, {params: args}).success(function(data, status, headers, config) {
            $scope.geoCodeSuccess(data);
        }).error(function(data, status, headers, config) {
            $scope.geoCodeFail();
        });
    };

    $scope.geoCodeSuccess = function(data) {
        if (data.results.length > 0) {
            marker_point = data.results[0];
            lat = marker_point.geometry.location.lat;
            lng = marker_point.geometry.location.lng;
            $scope.addressMarker = $scope.addLocationMarker(lat, lng, "Target Location", true);
        }
        $scope.findClosestBikeParking();
    };

    $scope.geoCodeFail = function() {
        trace("Geocoding failed");
    };

    $scope.clear = function() {
        if ($scope.addressMarker !== null) {
            $scope.addressMarker.setMap(null);
        }
    };
};
