'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const {resolve} = require('path');
const PrettyError = require('pretty-error');
const finalHandler = require('finalhandler');
const session = require('express-session')
const routes = require('./routes');

const app = express();

// const exec = Promise.promisify(require('child_process').exec);

// Pretty error prints errors all pretty. PrettyError docs: https://www.npmjs.com/package/pretty-error
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

  // express session
  .use(session({
      secret: '1234567890QWERTY',
      resave: true,
      saveUninitialized: true
    }))

<<<<<<< HEAD
  .use('/', routes)
=======
  // adding userid to req.session
  .post('/setUser', (req, res, next) => {
      const userId = req.body.userId;
      req.session.userId = userId;
      res.sendStatus(200);
  })

  .get('/removeUser', (req, res, next) => {
    req.session.destroy();
    res.sendStatus(200);
  })

  .post('/container', (req, res, next) => {
    if (req.session.userId){

      const argsObj = {
        userId: req.session.userId.toLowerCase(),
        userRoutes: req.body.userRoutes,
        userModels: req.body.userModels,
        userHTML: req.body.userHTML,
        userCSS: req.body.userCSS,
        userJS: req.body.userJS,
      }

      // find a port that is available
      portfinder.getPortPromise()
      .then((port) => {
        argsObj.serverPort = port;
        argsObj.postgresPort = port + 1;
        // argsObj.serverPort = 8000;
        // argsObj.postgresPort = 8001;
        console.log('server port', argsObj.serverPort);
        console.log('postgres port', argsObj.postgresPort);
      })
      .then(() => {
        runContainer(argsObj);
        // send response with port number
        // how to send response after docker compose up ?????
        res.send({response: 'running container on port', port: argsObj.serverPort});
      })
      .catch(console.error);

    } else {
      res.send('no logged in user');
    }
  })

  .get('/removeContainer', (req, res, next) => {
    if (req.session.userId){
      const userId = req.session.userId.toLowerCase();
      removeContainer(userId);
      res.send('removed container')
    } else {
      res.send('no logged in user');
    }
  })

  .post('/postWomanGetPath', (req, res, next) => {
    req.session.path = req.body.path;
    res.send('path now on session');
  })

  // run a get request in container terminal and receive the result
  .get('/containerGet', (req, res, next) => {
    // the container's name is the user id plus `app_docker-test_1`
    if (req.session.userId){
        const path = req.session.path;
        const userId = req.session.userId.toLowerCase();
        const containerName = `${userId}app_docker-test_1`;
        // command below gets the container name's id
        exec(`docker ps -aqf "name=${containerName}"`)
        .then( (containerId) => {
          return exec('docker exec ' + containerId.trim() + ' curl http://localhost:8080' + path.trim());
        })
        .then((result) => {
          res.send(result);
        })
        .catch(console.error);
      } else {
      console.log("Error - No user saved on session!");
      }
    })
// trying to dry it out by combining post and put...
    .post('/containerPostPutDeleteTest', (req, res, next) => {
      if (req.session.userId){
        const requestBody = req.body.request;
        const requestType = req.body.requestType;
        console.log('request type in server.js', requestType);
        const path = req.session.path;
        const userId = req.session.userId.toLowerCase();
        const containerName = `${userId}app_docker-test_1`;
        exec(`docker ps -aqf "name=${containerName}"`)
        .then( (containerId) => {
          return exec(`docker exec ${containerId.trim()} curl -H "Accept: application/json" -H "Content-type: application/json" -X ${requestType} -d '${requestBody}' http://localhost:8080${path.trim()}`);
        })
        .then((result) => {
            res.send(result);
        })
        .catch(console.error);
      } else {
        console.log('Error - No user saved on session!');
      }
    })
>>>>>>> 130c454872425c1524f1df0b86537510c85968cc

// PUT-AND-DELETE
  //   .put('/containerPutTest', (req, res, next) => {
  //     if (req.session.userId){
  //       const requestBody = req.body.request;
  //       const path = req.session.path;
  //       const userId = req.session.userId.toLowerCase();
  //       const containerName = `${userId}app_docker-test_1`;
  //       exec(`docker ps -aqf "name=${containerName}"`)
  //       .then( (containerId) => {
  //           return exec(`docker exec ${containerId.trim()} curl -H "Accept: application/json" -H "Content-type: application/json" -X PUT -d '${requestBody}' http://localhost:8080${path.trim()}`)
  //       })
  //       .then((result) => {
  //           res.send(result);
  //       })
  //       .catch(console.error);
  //     } else {
  //       console.log("Error - No user saved on session!")
  //     }
  // })

  //     .delete('/containerDeleteTest', (req, res, next) => {
  //     if (req.session.userId){
  //       const requestBody = req.body.request;
  //       const path = req.session.path;
  //       const userId = req.session.userId.toLowerCase();
  //       const containerName = `${userId}app_docker-test_1`;
  //       exec(`docker ps -aqf "name=${containerName}"`)
  //       .then( (containerId) => {
  //           return exec(`docker exec ${containerId.trim()} curl -H "Accept: application/json" -H "Content-type: application/json" -X DELETE http://localhost:8080${path.trim()}`)
  //       })
  //       .then(() => {
  //           res.send('deleted!');
  //       })
  //       .catch(console.error);
  //     } else {
  //       console.log("Error - No user saved on session!")
  //     }
  // })

    // .post('/containerDeleteTest', (req, res, next) => {
    //   if (req.session.userId){
    //     const requestBody = req.body.request;
    //     const requestType = req.body.requestType;
    //     const path = req.session.path;
    //     const userId = req.session.userId.toLowerCase();
    //     const containerName = `${userId}app_docker-test_1`;
    //     exec(`docker ps -aqf "name=${containerName}"`)
    //     .then( (containerId) => {
    //         return exec(`docker exec ${containerId.trim()} curl -H "Accept: application/json" -H "Content-type: application/json" -X DELETE -d '${requestBody}' http://localhost:8080${path.trim()}`)
    //     })
    //     .then((result) => {
    //         res.send(result);
    //     })
    //     .catch(console.error);
    //   } else {
    //     console.log("Error - No user saved on session!")
    //   }
    // })

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

