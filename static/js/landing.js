function MapCtrl($scope, $http) {
    $scope.map = null;
    /* 
       This will immediately call an API to get the users latLng from their IP address.
       I'm making this asynchronous in case the API call is slow, I don't want it to slow
       down the initial page load.
    */
    $http.get('user-city/').success(function(data, status, headers, config) {
        if ($scope.map === null) {
            $scope.initialize(data.lat, data.lng, 14);
        } else {
            $scope.map.setCenter(new google.maps.LatLng(data.lat, data.lng));
            $scope.map.setZoom(14);
        }
    });

    $scope.initialize = function(lat, lng, zoom) {
        $scope.mapOptions = {
            zoom: zoom,
            center: new google.maps.LatLng(lat, lng)
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
        $scope.map.setZoom(17);
        if (center) {
            $scope.map.setCenter(latLng);
        }
        return marker;
    };
};

function AddressCtrl($scope, $http) {
    $scope.address = '';
    $scope.addressMarker = null;
    $scope.bikeMarkers = [];

    $scope.addAddressMarker = function() {
        // Clear out old address and markers.
        $scope.clear();

        var url = 'http://maps.googleapis.com/maps/api/geocode/json';
        var args = {'address': $scope.address,
                    'sensor': false};

        $http.get(url, {params: args}).success(function(data, status, headers, config) {
            $scope.geoCodeSuccess(data);
        }).error(function(data, status, headers, config) {
            alert("There was an error finding the given address.");
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

    $scope.findClosestBikeParking = function() {
        var offset = 0.003;
        var latA = $scope.addressMarker.position.lat() + offset;
        var latB = $scope.addressMarker.position.lat() - offset;
        var lngA = $scope.addressMarker.position.lng() + offset;
        var lngB = $scope.addressMarker.position.lng() - offset;
        var url = socrata_url + '&$where=within_box(coordinates,' + latA + '°,' + lngB + '°,' + latB + '°,' + lngA + '°)';
        url = url + "&status='COMPLETE'";
        $http.get(url).success(function(data, status, headers, config) {
            var i;
            for (i=0;i < data.length; i++) {
                var lat = data[i].coordinates.latitude;
                var lng = data[i].coordinates.longitude;
                var name = data[i].yr_inst;
                var marker = $scope.addLocationMarker(lat, lng, name, false);
                marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
                $scope.bikeMarkers.push(marker);
            }
        });
    }

    $scope.clear = function() {
        if ($scope.addressMarker !== null) {
            $scope.addressMarker.setMap(null);
        }
        var i;
        for (i=0; i < $scope.bikeMarkers.length; i++) {
            $scope.bikeMarkers[i].setMap(null);
        }
        $scope.bikeMarkers = [];
    };
};
