'use strict';
var retry = require('retry');
var pg = require('pg');
var models = require('./models');
var db = models.db;
const express = require('express');
const userApp = require('./userApp');

var operation = retry.operation({ retries: 3 });

// Constants
const PORT = 8080;

// App
operation.attempt(function() {
    var client = new pg.Client()
    client.connect(function(e) {
        client.end()
        if (operation.retry(e)) {
            return;
        }
        if (!e) console.log("Hello Postgres!")

        const server = express();
        server.use('/', userApp);

        db.sync({ force: true })
            .then(() => {
                server.listen(PORT, () => {
                    console.log(process.env.DATABASE_URL);
                    console.log('Running on port', PORT);
                });
            })
    })
})



