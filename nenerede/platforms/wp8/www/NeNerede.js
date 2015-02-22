/// <reference path="jquery-2.1.0.js" />
/// <reference path="jquery.mobile-1.4.0.js" />

var map;
var service;
var infowindow;
var searchResults = [];
var lat, long, targetLat, targetLong;
var userEmail, userPassword;
var isFromAzure = false;
isLoggedIn = false;

function FindMyLoc() {
    var onSuccess = function (position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;

    }
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    

}

function myLocation() {
    FindMyLoc();
    $.mobile.changePage("#map-page");
}


$(document).ready(function () {
    FindMyLoc();
    $("#MyLocationBtn").click(myLocation);
    $("#Find").click(initialize);
    $("#registerBtn").click(Register);
    $("#Fav").click(addToFav);
    $("#loginBtn").click(Login);
    $("#logoutBtn").click(Logout);
    $("#displayFavs").click(DisplayFavs);
    $.mobile.changePage("#map-page");


});

function appbarhome() {

    $.mobile.changePage("#map-page");

}
function appbarsearch() {

    $.mobile.changePage("#Search");

}
function appbarprofile() {
    if (isLoggedIn) {
        DisplayFavs();
        $.mobile.changePage("#Favorites");
    }
    else
        $.mobile.changePage("#Login");
}

$(document).on("pageshow", "#map-page", function () {
    var onSuccess = function (position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;

    }
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    
    drawMap(new google.maps.LatLng(lat, long));

    function drawMap(latlng) {
        var myOptions = {
            zoom: 10,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        // Add an overlay to the map of current lat/lng
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Greetings!"
        });
    }

    alert(lat);
    var reverseGeocoder = new google.maps.Geocoder();
    var currentPosition = new google.maps.LatLng(lat, long);
    reverseGeocoder.geocode({ 'latLng': currentPosition }, function (results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                //alert('Address : ' + results[0].formatted_address + ',' + 'Type : ' + results[0].types);
                document.getElementById("address").innerHTML = results[0].formatted_address;
            }
            else {
                alert('Konumunuz bulunamadı');
            }
        } else {
            alert('Konumunuz bulunamadı.');
        }
    });
});

$(document).on("pageshow", "#SelectLocation", function () {

    var myLatlng = new google.maps.LatLng(lat,long);
    var mapOptions = {
        zoom: 4,
        center: myLatlng
    }
    map = new google.maps.Map(document.getElementById("map-canvas3"), mapOptions);

    google.maps.event.addListener(map, 'click', function (event) {
        placeMarker(event.latLng);
        lat = event.latLng.lat();
        long = event.latLng.lng();

    });

    function placeMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });

        map.setCenter(location);

    }
});


function Register() {

    var name, surname, password;
    name = $("#memberName").val();
    surname = $("#memberSurname").val();
    password = $("#memberPass").val();
    email = $("#memberEmail").val();

    if (name == "" || surname == "" || password == "")
        alert("Lütfen tam bilgilerinizi giriniz.")
    else {

        var client = new WindowsAzure.MobileServiceClient('https://nenerede.azure-mobile.net/', 'your-key-here');
        uyelerTable = client.getTable('uyeler');

        var query = uyelerTable.where({ email: email });
        query.read().then(function (memberItem) {
            if (memberItem.length > 0)
                alert("Bu e-posta adresi daha önce kullanılmış.");
            else {
                var item = { name: name, surname: surname, password: password, email: email };
                uyelerTable.insert(item);
            }
        })

        isLoggedIn = true;
        userEmail = email;
        registerForm.reset();
        $.mobile.changePage("#Favorites");
    }
}

function Login() {
    userEmail = $("#loginEmail").val();
    userPassword = $("#loginPass").val();

    if (userEmail == "" || userPassword == "")
        alert("Lütfen tam bilgilerinizi giriniz.")
    else {
        var client = new WindowsAzure.MobileServiceClient('https://nenerede.azure-mobile.net/', 'mxwhdfSZXjtcBoiUfZZOlyWJwPOIKK72');
        uyelerTable = client.getTable('uyeler');

        var query = uyelerTable.where({ email: userEmail, password: userPassword });

        query.read().then(function (memberItem) {
            //alert(memberItem.length);

            if (memberItem.length > 0) {
                alert("Hoşgeldiniz");
                isLoggedIn = true;
                $.mobile.changePage("#Favorites");
                //$.mobile.loadPage("#Favorites");
            }
            else {
                alert("Böyle bir kullanıcı yok.");
            }
        });
        loginForm.reset();
        
    }
}

function Logout() {
    userEmail = null;
    userPassword = null;
    isLoggedIn = false;
    $.mobile.changePage("#Favorites");
}

function initialize() {

    if ($("#radius").val() == "" || $("#place").val() == "")
        alert("Lütfen seçimlerinizi giriniz.");
    else {

        var location = new google.maps.LatLng(lat, long);

        map = new google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom: 15
        });

        var request = {
            location: location,
            radius: $("#radius").val(),
            query: $("#place").val()
        };

        $("#ShowResultsHeader").text($("#place").val() + " Arama...");

        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
    }
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {

        $MList = $("#ResultsList");
        $MList.html("");
        for (var i = 0; i < results.length; i++) {

            var ListItem = "<li>";
            ListItem += '<a href="#" data-index="' + i + '" class="Item">';
            ListItem += results[i].name + "</a>";
            ListItem += "</li>";
            $MList.append(ListItem);

            searchResults[i] = results[i];

            //createMarker(results[i]);
        }

        isFromAzure = false;

        $(".Item").unbind().click(ShowAddress);
        $MList.listview().listview("refresh");
        form1.reset();
        $.mobile.changePage("#ShowResults");
    }
}
function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

var SelectedItem;
function ShowAddress() {
    $this = $(this);
    var idx = $this.attr("data-index");

    if (isFromAzure) {
        var client = new WindowsAzure.MobileServiceClient('https://nenerede.azure-mobile.net/', 'mxwhdfSZXjtcBoiUfZZOlyWJwPOIKK72');
        favoritesTable = client.getTable('favorites');

        var query = favoritesTable.where({ id: idx });
        query.read().then(function (favItem) {
            targetLat = favItem[0].latitude;
            targetLong = favItem[0].longitude;
            document.getElementById("Name2").innerHTML = favItem[0].nameofplace;
            document.getElementById("Address").innerHTML = favItem[0].addressofplace;
            $("#AboutHeader").text(favItem[0].nameofplace);
        });
    }
    else {

        SelectedItem = searchResults[idx];

        document.getElementById("Name2").innerHTML = SelectedItem.name;
        document.getElementById("Address").innerHTML = SelectedItem.formatted_address;
        $("#AboutHeader").text(SelectedItem.name);

        targetLat = SelectedItem.geometry.location.k;
        targetLong = SelectedItem.geometry.location.B;
    }


    $.mobile.changePage("#About");
}

$(document).on("pageshow", "#About", function () {

    var defaultLatLng = new google.maps.LatLng(targetLat, targetLong);  // Default to Hollywood, CA when no geolocation support
    //alert(defaultLatLng);
    drawMap(defaultLatLng);  // No geolocation support, show default map

    function drawMap(latlng) {
        var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-canvas1"), myOptions);
        // Add an overlay to the map of current lat/lng
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Greetings!"
        });
    }

});

function DisplayFavs() {
    var client = new WindowsAzure.MobileServiceClient('https://nenerede.azure-mobile.net/', 'mxwhdfSZXjtcBoiUfZZOlyWJwPOIKK72');
    favoritesTable = client.getTable('favorites');

    $MList = $("#favList");
    $MList.html("");
    document.getElementById("warning").innerHTML = "";

    if (isLoggedIn) {
        var query = favoritesTable.where({ useremail: userEmail });
        query.read().then(function (favItem) {

            if (favItem.length > 0) {

                for (var i = 0; i < favItem.length; i++) {

                    var ListItem = "<li>";
                    ListItem += '<a href="#" data-index="' + favItem[i].id + '" class="Item">';
                    ListItem += favItem[i].nameofplace + "</a>";
                    ListItem += "</li>";
                    $MList.append(ListItem);

                }

                isFromAzure = true;

                $(".Item").unbind().click(ShowAddress);
                $MList.listview().listview("refresh");
            }
            else {

                document.getElementById("warning").innerHTML = "favori yok";
            }
        });
    }
    else {
        document.getElementById("warning").innerHTML = "Giriş yapınız.";
    }

}


function addToFav() {
    if (isLoggedIn) {

        if (isFromAzure)
            alert("Bu mekan zaten favorilerinizde.");
        else {
            var client = new WindowsAzure.MobileServiceClient('https://nenerede.azure-mobile.net/', 'your-key-here');
            favoritesTable = client.getTable('favorites');

            var item = { useremail: userEmail, userpassword: userPassword, nameofplace: SelectedItem.name, addressofplace: SelectedItem.formatted_address, latitude: SelectedItem.geometry.location.k, longitude: SelectedItem.geometry.location.B };
            favoritesTable.insert(item);
        }
    }
    else {
        alert("Lütfen giriş yapınız");
    }
}

$(document).on("pageshow", "#Direction", function () {
    var defaultLatLng = new google.maps.LatLng(targetLat, targetLong);  // Default to Hollywood, CA when no geolocation support

    document.getElementById('directions-panel').innerHTML = "";
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();

    directionsDisplay = new google.maps.DirectionsRenderer();

    var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(lat, long)
    };
    var map = new google.maps.Map(document.getElementById('map-canvas2'),
        mapOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));


    //Calculates the route
    var start = new google.maps.LatLng(lat, long);
    var end = defaultLatLng;
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.WALKING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });


});



