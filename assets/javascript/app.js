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
                // drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
            },
            markerOptions: {
                icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
            }
        });
        drawingManager.setMap(map);

        google.maps.event.addListener(drawingManager, 'markercomplete', function (marker) {
            console.log(marker)
            window.marker = marker;
            coord.push({
                lng: marker.position.lng(),
                lat: marker.position.lat()
            })
            console.log(coord);

            // var p1 = new google.maps.LatLng(coord[0]);
            // var p1 = new google.maps.LatLng(coord[1]);

            // alert(calcDistance(p1, p2));

            // function calcDistance(p1, p2) {
            //     return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
        //     }
        // }
        });

        // polyline = new google.maps.Polyline({
        //     map: map,
        //     path: coord,
        //     strokeColor: "#FF0000",
        //     strokeOpacity: 1.0,
        //     strokeWeight: 2
        // });

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
                
                //$(`#weather`).html((Math.round((response.main.temp) - 273.15) * 9 / 5 + 32));
                // $(`#weather`).append(response.weather[0].description);
                //$(`#icon`).html(response.weather[0].icon);

                $(`#weather`).html(imageConverter(response));
            })
            postscribe("#widget", `<script type='text/javascript' src='https://darksky.net/widget/graph-bar/${latitude},${longitude}/us12/en.js?width=100%&height=300&title=Full Forecast&textColor=333333&bgColor=transparent&transparency=true&skyColor=undefined&fontFamily=Default&customFont=&units=us&timeColor=333333&tempColor=333333&currentDetailsOption=true'></script>`)

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





    // Drawing Tools
    // var drawingManager = new google.maps.drawing.DrawingManager({
    //     drawingMode: google.maps.drawing.OverlayType.MARKER,
    //     drawingControl: true,
    //     drawingControlOptions: {
    //         position: google.maps.ControlPosition.TOP_CENTER,
    //         drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
    //     },
    //     markerOptions: {
    //         icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    //     },
    //     circleOptions: {
    //         fillColor: '#ffff00',
    //         fillOpacity: 1,
    //         strokeWeight: 5,
    //         clickable: false,
    //         editable: true,
    //         zIndex: 1
    //     }
    // });
    // drawingManager.setMap(map);