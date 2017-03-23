const Promise = require('bluebird');

const sendDataToContainer = (containerId) => {
  // docker exec container curl http
  const exec = Promise.promisify(require('child_process').exec);

  exec(`docker exec ${containerId} curl http://localhost:8080/test`)
  .then((res) => {
    console.log('curllllll', res);
  })
  .catch(console.error);
}

sendDataToContainer('9d1946bbed94');
