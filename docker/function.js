const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');

const dockerFunc = () => {
    //promisified child process exec
    const exec = Promise.promisify(require('child_process').exec);
    const writeFile = Promise.promisify(fs.writeFile);
    const readFile = Promise.promisify(fs.readFile);

    //create user app folder
    exec('mkdir user-app')
    .then(() => {
        //change current working directory
        try {
          process.chdir('./user-app');
          console.log(`Changed working directory: ${process.cwd()}`);
        }
        catch (err) {
          console.log(`chdir: ${err}`);
        }

        //check that we can do docker-compose down and delete user-app folder
        setTimeout(() => {
            console.log('timeout, docker compose down');
            exec('docker-compose down')
            .then(() => {
                process.chdir('../');
                console.log(`Changed working directory: ${process.cwd()}`);
                console.log('deleting user-app folder');
                exec('rm -r user-app');
            })
            .catch(console.error);
        }, 60000);

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
    })
    .then(() => {
        // run docker container
        console.log('running docker-compose up');
        return exec('docker-compose up');
    })
    .catch(console.error);


};

dockerFunc();
