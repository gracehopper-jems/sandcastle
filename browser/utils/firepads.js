import firebase from 'firebase';
import store from '../store';

export default function makeFirepads() {
	let userId = store.getState().user.userId;

	var cssFirepadRef = firebase.database().ref(`/users/${userId}/css`);
	var htmlFirepadRef = firebase.database().ref(`/users/${userId}/html`);
	var jsFirepadRef = firebase.database().ref(`/users/${userId}/javascript`);
	var serverFirepadRef = firebase.database().ref(`/users/${userId}/server`);
	var databaseFirepadRef = firebase.database().ref(`/users/${userId}/database`);

	let firepads = [
		{ id: 'html-firepad-container', mode: 'xml' },
		{ id: 'css-firepad-container', mode: 'css'},
		{ id: 'js-firepad-container', mode: 'javascript'},
		{id: 'server-firepad-container', mode: 'javascript'},
		{id: 'db-firepad-container', mode: 'javascript'}
	];

	let fires = firepads.map(firepad => {
		return CodeMirror(document.getElementById(firepad.id), {
			lineWrapping: true,
			lineNumbers: true,
			mode: firepad.mode,
			matchBrackets: true,
			autoCloseBrackets: true,
			// matchTags: true,
			autoCloseTags: true,
			toggleComment: true,
			foldCode: true,
			hint: true,
			autoRefresh: true,
		});
	});

	const htmlFirepad = Firepad.fromCodeMirror(htmlFirepadRef, fires[0], {
		richTextShortcuts: false,
		richTextToolbar: false,
		defaultText: `<!--write html body here-->
<center>
  <h1>My Tiny App</h1>
</center>
<div id="map"></div>

<link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet">`
	});

	const cssFirepad = Firepad.fromCodeMirror(cssFirepadRef, fires[1], {
		richTextShortcuts: false,
		richTextToolbar: false,
		defaultText: `/*write css here*/
h1 {
  color: #add8e6;
  font-family: 'Space Mono', monospace;
}

#map {
  height: 400px;
  width: 100%;
  background-color: #add8e6;
}`
	});

	const jsFirepad = Firepad.fromCodeMirror(jsFirepadRef, fires[2], {
		richTextShortcuts: false,
		richTextToolbar: false,
		defaultText: `/* javascript here!
if you are running frontend js only, click 'run frontend'
if you are running backend js too, click 'run backend'*/

var axios = require('axios');

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
	});

	// added boilerplate for userroutes and usermodels
	const serverFirepad = Firepad.fromCodeMirror(serverFirepadRef, fires[3], {
		richTextShortcuts: false,
		richTextToolbar: false,
		defaultText: `const express = require('express');
const models = require('./userModels');
const router = express.Router();

// write your routes below

// get all map markers
router.get('/markers', (req, res) => {
	models.MapMarker.findAll()
	.then((mapMarkers) => {
  		res.send(mapMarkers)
	})
	.catch(console.error);
});

// add a map marker
router.post('/addMarker', (req, res) => {
  models.MapMarker.create({
    name: req.body.name,
    lat: req.body.lat,
    lng: req.body.lng
  })
  .then((mapMarker) => {
    res.send(mapMarker);
  })
  .catch(console.error);
});

// get map marker by name
router.get('/markers/:name', (req, res) => {
  models.MapMarker.findOne({
    where: {
      name: req.params.name
    }
  })
  .then((mapMarker) => {
    res.send(mapMarker);
  })
  .catch(console.error);
});

// update map marker's name
router.put('/markers/:name', (req, res) => {
  models.MapMarker.findOne({
    where: {
      name: req.params.name
    }
  })
  .then((mapMarker) => {
    return mapMarker.update({
      name: req.body.name
    })
  })
  .then((updatedMapMarker) => {
    res.send(updatedMapMarker)
  })
  .catch(console.error)
})

// delete a marker by name
router.delete('/markers/:name', (req, res) => {
  let id;
  models.MapMarker.findOne({
    where: {
      name: req.params.name
    }
  })
  .then((mapMarker) => {
    id = mapMarker.id;
    mapMarker.destroy();
  })
  .then(() => {
    // response for delete route must be the deleted instance's id
    res.json(id);
  })
  .catch(console.error)
})

module.exports = router;`
	});

	const databaseFirepad = Firepad.fromCodeMirror(databaseFirepadRef, fires[4], {
		richTextShortcuts: false,
		richTextToolbar: false,
		defaultText: `const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL);

// write your models below
const MapMarker = db.define('MapMarker', {
  name: Sequelize.STRING,
  lat: Sequelize.DECIMAL,
  lng: Sequelize.DECIMAL
})

module.exports = {
  db: db,
  // include your models below
  MapMarker: MapMarker
}`
	});

	let allFirepads = [[htmlFirepad, cssFirepad, jsFirepad, serverFirepad, databaseFirepad], fires];
	// setTimeout(() => {
	// 	console.log('got here');
	// 	fires[1].refresh();
	// }, 3000);
	return allFirepads;
}



