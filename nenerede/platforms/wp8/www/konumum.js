$(document).ready(function () {
    //FindMyLoc();
    initialize();
});

var map;
var lat, long;

function initialize() {
    var mapOptions = {
        zoom: 8,
        center: new google.maps.LatLng(lat,longi)
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

}

//function FindMyLoc() {
//    var onSuccess = function (position) {
//        lat = position.coords.latitude;
//        long = position.coords.longitude;
//    }
//    // onError Callback receives a PositionError object
//    //
//    function onError(error) {
//        alert('code: ' + error.code + '\n' +
//              'message: ' + error.message + '\n');
//    }

//    navigator.geolocation.getCurrentPosition(onSuccess, onError);
//}
