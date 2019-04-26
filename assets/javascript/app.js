
var map, infoWindow;


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 30.2849,
            lng: -97.7341
        },
        zoom: 15
    });
    infoWindow = new google.maps.InfoWindow;

    function myMap() {

        var coord = [];

        var drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.MARKER,
            drawingControl: false,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
            },
            markerOptions: {
                animation: google.maps.Animation.DROP,
                icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
            }
        });
        drawingManager.setMap(map);

        google.maps.event.addListener(drawingManager, 'markercomplete', function (marker) {

            window.marker = marker;
            coord.push({
                lng: marker.position.lng(),
                lat: marker.position.lat()
            })

            var flightPath = new google.maps.Polyline({
                path: coord,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            flightPath.setMap(map);

            var lengthInMeters = google.maps.geometry.spherical.computeLength(flightPath.getPath());
            var convertedToMiles = ((lengthInMeters) / 1609.344);

            $(`#miles`).html(Math.round(convertedToMiles * 100) / 100 + " miles");

        });

        $(`#miles`).html("0.00 miles");
    }
    myMap();

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var latitude = pos.lat;
            var longitude = pos.lng;

            var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&&APPID=9c7fdaf4c8e115f87c5bd3abe0cd5762";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                $(`#weather`).html(imageConverter(response));
            })
            postscribe("#widget", `<script type='text/javascript' src='https://darksky.net/widget/graph-bar/${latitude},${longitude}/us12/en.js?width=100%&height=400&title=Full Forecast&textColor=333333&bgColor=transparent&transparency=true&skyColor=undefined&fontFamily=Default&customFont=&units=us&timeColor=333333&tempColor=333333&currentDetailsOption=true'></script>`)

            infoWindow.setPosition(pos);
            infoWindow.setContent('You are here!');
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

$("#reset").on("click", function(){
    event.preventDefault();
    $("#miles").empty();
    $("#widget").empty();
    initMap();
});

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function imageConverter(response) {

    return `
        <div class="d-inline-block font-weight-light">
            <p>${((Math.round((response.main.temp) - 273.15) * 9 / 5 + 32))}°F</p>
        </div>
        <div class="d-inline-block text-capitalize font-weight-light">
            <p>${response.weather[0].description}</p>
         </div>
        <div class="d-inline-block">
            <img src="http://openweathermap.org/img/w/${response.weather[0].icon}.png"/>
        </div>
    `
}
