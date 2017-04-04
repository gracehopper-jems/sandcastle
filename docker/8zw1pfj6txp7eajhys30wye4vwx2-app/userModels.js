const Sequelize = require('sequelize');
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
}