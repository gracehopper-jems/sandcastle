/* javascript here!
if you are running frontend js only, click 'run frontend'
if you are running backend js too, click 'run backend'*/

var _ = require('lodash');
var axios = require('axios');

console.log('====chunk', _.chunk(['a', 'b', 'c', 'd'], 2));


$(document).ready(function() {
  console.log("document ready!");
    if (document.querySelectorAll('#map').length > 0) {
    var js_file = document.createElement('script');
    js_file.type = 'text/javascript';
    js_file.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAYFe4X2zwVZvzFXc57XWOJ_QP4Mff_J9s&callback=initMap';
    document.getElementsByTagName('head')[0].appendChild(js_file);
  }
});

let map;
initMap = () => {

  var gracehopper = {lat: 40.705344, lng: -74.009171};
  map = new google.maps.Map(document.getElementById('map'), {
          zoom: 1,
          center: gracehopper
    });

    // add markers that are posted to server
    axios.get('/markers')
    .then((res) => {
      console.log('markerData', res.data);
      return res.data;
    })
    .then((markerData) => {
      if (markerData.length > 0) {
        plotMarkers(markerData);
      }
    })
    .catch(console.error);
}

let markers;
let bounds;

function plotMarkers(m) {
  markers = [];
  bounds = new google.maps.LatLngBounds();

  m.forEach(function (markerDataPt) {
    const position = new google.maps.LatLng(markerDataPt.lat, markerDataPt.lng);

    const marker = new google.maps.Marker({
        position: position,
        map: map,
        animation: google.maps.Animation.DROP
    })

    const infowindow = new google.maps.InfoWindow({
          content: markerDataPt.name
    });

    marker.addListener('click', function() {
          infowindow.open(map, marker);
    });

    markers.push(marker);
  });
}