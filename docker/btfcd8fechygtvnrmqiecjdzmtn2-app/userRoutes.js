const express = require('express');
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

module.exports = router;