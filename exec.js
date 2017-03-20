const Promise = require('bluebird');
const exec = Promise.promisify(require('child_process').exec);

exec('ls')
.then((res) => {
  console.log('====', res)
})
