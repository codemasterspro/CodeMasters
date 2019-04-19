var map, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var latitude = pos.lat;
            var longitude = pos.lng;

            console.log(latitude);
            console.log(longitude);
            // console.log(pos.lat);
            // console.log(pos.lng);

            var queryURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&&APPID=9c7fdaf4c8e115f87c5bd3abe0cd5762";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response)
                // $(`#movie-view`).text(JSON.stringify(response));
                // $(`#movie-view`).html(makeMovie(response));


            })

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}