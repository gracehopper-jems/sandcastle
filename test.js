const argsObj = {};
argsObj.userJS = `/* javascript here!
if you are running frontend js only, click 'run frontend'
if you are running backend js too, click 'run backend'*/

var axios = require('axios');
var uniq = require('uniq');
var lodash = require('lodash');

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
      console.log('markers', res.data);
      return res.data;
    })
    .then((markers) => {
      if (markers.length > 0) {
        plotMarkers(markers);
      }
    })
    .catch(console.error);
}

let markers;
let bounds;

function plotMarkers(m) {
  markers = [];
  bounds = new google.maps.LatLngBounds();

  m.forEach(function (marker) {
    var position = new google.maps.LatLng(marker.lat, marker.lng);

    markers.push(
      new google.maps.Marker({
        position: position,
        map: map,
        animation: google.maps.Animation.DROP
      })
    );
  });
}`


const jsArray = argsObj.userJS.split('\n').filter(line => {
        return line.includes('require');
    })
    .map(line => {
        const beforeModuleStr = 'require(\'';
        const afterModuleStr = '\');';
        let startIndex = line.indexOf(beforeModuleStr);
        let endIndex = line.indexOf(afterModuleStr);
        return line.slice(startIndex + beforeModuleStr.length, endIndex);
    });
console.log(jsArray);
