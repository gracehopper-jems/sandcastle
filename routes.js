const express = require('express');
const router = express.Router();
const portfinder = require('portfinder');
const runContainer = require('./docker/runContainer');
const removeContainer = require('./docker/removeContainer');
const Promise = require('bluebird');
const exec = Promise.promisify(require('child_process').exec);

module.exports = router
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
      const argsObj = req.body;
      argsObj.userId = req.session.userId.toLowerCase();

      // find a port that is available
      portfinder.getPortPromise()
      .then((port) => {
        let serverPort = port;
        let postgresPort = port + 1;
        console.log('server port', serverPort);
        console.log('postgres port', postgresPort);
        return {serverPort, postgresPort};
      })
      .then((portsObj) => {
        runContainer(Object.assign({}, argsObj, portsObj));
        // send response with port number
        // how to send response after docker compose up ?????
        res.send({response: 'running container on port', port: portsObj.serverPort});
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
        console.log("Error - No user saved on session!")
      }
    })

    .post('/containerPostTest', (req, res, next) => {
      if (req.session.userId){
        const requestBody = req.body.request;
        const path = req.session.path;
        const userId = req.session.userId.toLowerCase();
        const containerName = `${userId}app_docker-test_1`;
        exec(`docker ps -aqf "name=${containerName}"`)
        .then( (containerId) => {
            return exec(`docker exec ${containerId.trim()} curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '${requestBody}' http://localhost:8080${path.trim()}`)
        })
        .then((result) => {
            res.send(result);
        })
        .catch(console.error);
      } else {
        console.log("Error - No user saved on session!")
      }
    })


      .delete('/containerDeleteTest', (req, res, next) => {
      if (req.session.userId){
        const path = req.session.path;
        const userId = req.session.userId.toLowerCase();
        const containerName = `${userId}app_docker-test_1`;
        exec(`docker ps -aqf "name=${containerName}"`)
        .then( (containerId) => {
            return exec(`docker exec ${containerId.trim()} curl -X "DELETE" http://localhost:8080${path.trim()}`)
        })
        .then((result) => {
            console.log("Result from DELETE", result)
            res.send(result);
        })
        .catch(console.error);
      } else {
        console.log("Error - No user saved on session!")
      }
    })
