'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const {resolve} = require('path');
const PrettyError = require('pretty-error');
const finalHandler = require('finalhandler');
const runContainer = require('./docker/runContainer');
// PrettyError docs: https://www.npmjs.com/package/pretty-error
const Promise = require('bluebird');

const app = express();

// Pretty error prints errors all pretty.
const prettyError = new PrettyError();

// Skip events.js and http.js and similar core node files.
prettyError.skipNodeFiles()

// Skip all the trace lines about express' core and sub-modules.
prettyError.skipPackage('express')

module.exports = app
  // Body parsing middleware
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

  // Serve static files from ../public
  .use(express.static(resolve(__dirname, 'public')))

  // Serve our api - ./api also requires in ../db, which syncs with our database
  // .use('/api', require('./api'))

  .post('/container', (req, res, next) => {
    const userId = req.body.userId;
    const userRoutes = req.body.userRoutes;
    const userModels = req.body.userModels;
    console.log('POSTING TO CONTAINER')
    runContainer(userId, 3001, 6542, userRoutes, userModels);
    // send res after docker compose up
    res.send('posted to container')
  })

  // run a command in container terminal and receive the result
  .get('/containerTest', (req, res, next) => {
    const containerId = '9d1946bbed94';
    const exec = Promise.promisify(require('child_process').exec);

    exec(`docker exec ${containerId} curl http://localhost:8080/test`)
    .then((result) => {
      res.send(result);
    })
    .catch(console.error);
  })

  // Send index.html for anything else.
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, 'public', 'index.html')))

  // Error middleware interceptor, delegates to same handler Express uses.
  // https://github.com/expressjs/express/blob/master/lib/application.js#L162
  // https://github.com/pillarjs/finalhandler/blob/master/index.js#L172
  .use((err, req, res, next) => {
    console.error(prettyError.render(err))
    finalHandler(req, res)(err)
  })

const server = app.listen(
  3000,
  () => {
    console.log(`--- Started HTTP Server ---`);
    const { address, port } = server.address();
    const host = address === '::' ? 'localhost' : address;
    const urlSafeHost = host.includes(':') ? `[${host}]` : host;
    console.log(`Listening on http://${urlSafeHost}:${port}`);
  }
)

