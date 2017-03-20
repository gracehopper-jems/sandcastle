/* We would have to have this already provided for them on their blank text editor */

const express = require('express');
const models = require('./models');
const router = express.Router();

/* 
And then they would write out their models below:
**Note: the following is just a hardcoded test I made for us to use** 
 */

router.get('/', (req, res) => {
    models.Sandcastle.create({
            name: 'jems'
        })
        .then(() => {
            res.write('Made the first post to your database!')
            res.end();
        })
        .catch(console.error);
});

router.get('/test', (req, res) => {
    models.Sandcastle.create({
            name: 'test of second route'
        })
        .then((test) => {
            res.json(test);
        })
        .catch(console.error);
});

/* And we would provide this for them to make sure they are exporting their router correctly */
module.exports = router;
