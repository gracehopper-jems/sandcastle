'use strict';

const express = require('express');
const volleyball = require('volleyball');

const app = express();

app.use(volleyball);

app.use(express.static(__dirname));

const puppies = [{
  id: 1,
  name: 'Taylor',
  image: 'https://designerdoginfo.files.wordpress.com/2013/01/puggle-puppy-4.jpg?w=584'
}, {
  id: 2,
  name: 'Reggie',
  image: 'http://images.shape.mdpcdn.com/sites/shape.com/files/styles/slide/public/puppy-2_0.jpg'
}, {
  id: 3,
  name: 'Christian',
  image: 'https://www.askideas.com/media/19/Papillon-Puppy-Looking.jpg'
}, {
  id: 4,
  name: 'Jessie',
  image: 'http://www.101dogbreeds.com/wp-content/uploads/2015/10/Chi-Spaniel-Puppy-Pictures.jpg'
}, {
  id: 5,
  name: 'Pandora',
  image: 'http://4.bp.blogspot.com/-3JeIxWBU7bY/UKjIt8lVpCI/AAAAAAAABx8/YM8piSOwczs/s1600/Schipperke-Puppy.jpg'
}];

app.get('/api/puppies', function (req, res) {
  res.json(puppies.map(({id, name}) => ({id, name})));
});

app.get('/api/puppies/:id', function (req, res) {
  const aPuppy = puppies.find(p => p.id === Number(req.params.id));
  if (!aPuppy) res.status(404).end();
  else res.json(aPuppy);
});

app.listen(3000, function () {
  console.log('Server listening on port', 3000);
});

