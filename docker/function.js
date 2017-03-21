const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');

const userId = 'abc123';
// include timestamp in future if time


const dockerFunc = (userId) => {
    //promisified child process exec
    const exec = Promise.promisify(require('child_process').exec);
    const spawn = Promise.promisify(require('child_process').spawn);
    const writeFile = Promise.promisify(fs.writeFile);
    const readFile = Promise.promisify(fs.readFile);

    // new Promise(function (resolve, reject) {

    //     const runningProcess = spawn('docker-compose up');

    //     runningProcess.on('stdout', v => {
    //         showValue(v);
    //     });

    //     runningProcess.on('error', e => reject(e));
    //     runningProcess.on('end', statusCode => statusCode === 0 ? resolve() : reject());

    // })

    const promisifiedDockerComposeUp = new Promise(function (resolve, reject) {

        const runningProcess = require('child_process').spawn('docker-compose', ['up']);
        runningProcess.stdout.on('data', v => {
            console.log(v.toString());
        });
        runningProcess.stderr.on('data', e => reject(e));
        runningProcess.on('exit', statusCode => statusCode === 0 ? resolve() : reject());

    })


    //create user app folder
    exec(`mkdir ${userId}-app`)
    .then(() => {
        //change current working directory
        try {
          process.chdir(`./${userId}-app`);
          console.log(`Changed working directory: ${process.cwd()}`);
        }
        catch (err) {
          console.log(`chdir: ${err}`);
        }

        //check that we can do docker-compose down and delete user-app folder
        // in future run this in separate function when user reload their app on frontend
        setTimeout(() => {
            console.log('timeout, docker compose down');
            exec('docker-compose down')
            .then(() => {
                process.chdir('../');
                console.log(`Changed working directory: ${process.cwd()}`);
                console.log('deleting user-app folder');
                exec(`rm -r ${userId}-app`);
            })
            .catch(console.error);
        }, 20000);

        console.log("reading package.json");
        return readFile(path.join(__dirname,'./package.json'), 'utf8')
    })
    .then( (userPackageJson) => {
        console.log('creating a package.json');
        return writeFile('package.json', userPackageJson);
    })
    .then(() => {
        console.log("reading user server");
        return readFile(path.join(__dirname,'./server.js'), 'utf8')
    })
    .then((userServer) => {
        // write user server to user-app folder
        console.log('creating the server');
        return writeFile('server.js', userServer);
    })
    .then(() => {
        console.log("reading user models");
        return readFile(path.join(__dirname,'./models.js'), 'utf8')
    })
    .then((userModels) => {
        // write user models to user-app folder
        console.log('creating the user models');
        return writeFile('models.js', userModels);
    })
    .then(() => {
        console.log("reading user routes");
        return readFile(path.join(__dirname,'./userRoutes.js'), 'utf8')
    })
    .then((userRoutes) => {
        // write user routes to user-app folder
        console.log('creating the user routes');
        return writeFile('userRoutes.js', userRoutes);
    })
    .then(() => {
        console.log("reading docker-compose");
        return readFile(path.join(__dirname,'./docker-compose.yml'), 'utf8')
    })
    .then((dockerCompose) => {
        // write docker-compose to user-app folder
        console.log('creating docker-compose');
        return writeFile('docker-compose.yml', dockerCompose);
    })
    .then(() => {
        console.log("reading Dockerfile");
        return readFile(path.join(__dirname,'./Dockerfile'), 'utf8')
    })
    .then((dockerFile) => {
        // write dockerFile to user-app folder
        console.log('creating docker file');
        return writeFile('Dockerfile', dockerFile);
    })
    .then(() => {
      // build docker container
     console.log('building docker container')
      return exec('docker-compose build');
      //******error: Unhandled rejection (<docker_db_1 is up-to-date>, no stack trace) ????
    })
    .then(() => {
        // run docker container
        // console.log('running docker-compose up');
        // return exec('docker-compose up');
        return promisifiedDockerComposeUp;

        //****** returns random buffer????
    })
    .catch(console.error);


};

dockerFunc(userId);
