/* We would need to provide the below for them  at the start of their empty file */

var Sequelize = require('sequelize');
var db = new Sequelize(process.env.DATABASE_URL);


/* they would right out their models within our online text editor like below (again, below is just a hard-coded test) */

var Sandcastle = db.define('Sandcastle', {
    name: Sequelize.STRING
})


/* and then we would have to provide the module.exports for them too I think */
module.exports = {
    db: db, // we would provide this for them
    Sandcastle: Sandcastle // but they would have to add in all the tables they defined
}
