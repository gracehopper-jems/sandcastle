'use strict';
const retry = require('retry');
const pg = require('pg');
const models = require('./userModels');
const db = models.db;
const express = require('express');
const userRoutes = require('./userRoutes');
const operation = retry.operation({ retries: 3 });
const bodyParser = require('body-parser'); 

// Constants
const PORT = 8080;

// App
operation.attempt(function() {
    const client = new pg.Client()
    client.connect(function(e) {
        client.end()
        if (operation.retry(e)) {
            return;
        }
        if (!e) console.log("Hello Postgres!")

        const server = express();
        server.use(bodyParser.urlencoded({ extended: true })); 
        server.use(bodyParser.json()); 
        server.use('/', userRoutes);

        db.sync({ force: true })
            .then(() => {
                server.listen(PORT, () => {
                    console.log(process.env.DATABASE_URL);
                    console.log('Running on http://localhost:3001');
                });
            })
    })
})
