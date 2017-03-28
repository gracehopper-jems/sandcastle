const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const createHTML = require('./createHTML');

const dockerComposeStr = `db:
  image: postgres
  ports:
    - <%= postgresPort %>:<%= userPostgresPort %>
  environment:
    POSTGRES_USER: username
    POSTGRES_PASSWORD: pgpassword
    POSTGRES_DB: docker-test
docker-test:
  build: .
  ports:
    - <%= serverPort %>:<%= userServerPort %>
  links:
    - db
  environment:
    SEQ_DB: docker-test
    SEQ_USER: username
    SEQ_PW: pgpassword
    PORT: <%= userServerPort %>
    DATABASE_URL: postgres://username:pgpassword@db:5432/docker-test`;

const dockerFileStr = `FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE <%= userServerPort %>

CMD [ "npm", "start" ]`

const runContainer = (argsObj) => {
    const makeDockerCompose = _.template(dockerComposeStr);
    const makeDockerFile = _.template(dockerFileStr);
    const exec = Promise.promisify(require('child_process').exec);
    const writeFile = Promise.promisify(fs.writeFile);
    const readFile = Promise.promisify(fs.readFile);

    console.log(`DIRECTORY WHEN RUN BACKEND BUTTON CLICKED: ${process.cwd()}`);

    // check current directory
    const preppingAllWork = exec(`pwd`)
    .then((currentDirectory) => {
        // if user app folder already exists and already inside use app folder
        if (currentDirectory.includes(`${argsObj.userId}-app`)) {
            console.log('THERE IS ALREADY A USER APP')

            console.log('docker compose down');
            return exec('docker-compose down')
            .then(() => {
                // change into docker folder and delete user app folder
                process.chdir('../');
                console.log(`Changed working directory: ${process.cwd()}`);
                console.log('deleting user-app folder');
                return exec(`rm -r ${argsObj.userId}-app`);
            })
            .then(() => {
                // change into text-editor folder
                process.chdir('../');
                console.log(`Changed working directory: ${process.cwd()}`);
            })
            .then(() => {
                // create user app folder in docker folder
                // include timestamp in folder in future if time
                return exec(`mkdir docker/${argsObj.userId}-app`);
            })
            .catch(console.error);

        } else {
            // if user app folder does not exist and inside text editor folder
            // create user app folder
            console.log('NO USER APP FOLDER YET');
            return exec(`mkdir docker/${argsObj.userId}-app`);
        }
    })
    .then(() => {
        //change into user app folder
        try {
          console.log(`Current working directory: ${process.cwd()}`);
          process.chdir(`docker/${argsObj.userId}-app`);
          console.log(`Changed working directory: ${process.cwd()}`);
        }
        catch (err) {
          console.log(`chdir: ${err}`);
        }

        console.log("reading package.json");
        return readFile(path.join(__dirname,'./package.json'), 'utf8')
    })
    .then( (userPackageJson) => {
        console.log('creating a package.json');
        return writeFile('package.json', userPackageJson);
    })
    .then(() => {
        console.log("reading user server");
        return readFile(path.join(__dirname,'./userServer.js'), 'utf8')
    })
    .then((userServer) => {
        // write user server to user-app folder
        console.log('creating the server');
        return writeFile('userServer.js', userServer);
    })
    .then(() => {
        // write user models to user-app folder
        console.log('creating the user models');
        return writeFile('userModels.js', argsObj.userModels);
    })
    .then(() => {
        // write user routes to user-app folder
        console.log('creating the user routes');
        return writeFile('userRoutes.js', argsObj.userRoutes);
    })
    .then(() => {
        // create public directory
        console.log('making public directory');
        return exec('mkdir public');
    })
    .then(() => {
        // change into public directory
        console.log('changing into public directory')
        process.chdir('public');

        // create user html file
        const userHTML = createHTML(argsObj.userHTML);

        // write user html to pbulic folder
        console.log('creating the user html');
        return writeFile('index.html', userHTML);
    })
    .then(() => {
        // write user js to public folder
        console.log('creating the user js');
        return writeFile('userJS.js', argsObj.userJS);
    })
    .then(() => {
        // bundle user js file to require node modules
        console.log('browserifying js into bundle');
        return exec('browserify userJS.js -o userBundle.js');
    })
    .then(() => {
        // write user css to public folder
        console.log('creating the user css');
        return writeFile('style.css', argsObj.userCSS);
    })
    .then(() => {
        // change into user folder
        console.log('change into user app directory')
        process.chdir('../');
        // write docker-compose to user-app folder
        return writeFile('docker-compose.yml', makeDockerCompose({'serverPort': argsObj.serverPort, 'postgresPort': argsObj.postgresPort, 'userServerPort': process.env.userServerPort, 'userPostgresPort': process.env.userPostgresPort}));
    })
    .then(() => {
        // write dockerFile to user-app folder
        console.log('creating docker file');
        return writeFile('Dockerfile', makeDockerFile({'userServerPort': process.env.userServerPort}));
    })
    .then(() => {
        // build docker container
        console.log('building docker container')
        return exec('docker-compose build');
    })
    .then(() => {
        // run docker container
        console.log('running docker-compose up');
        const runningProcess = require('child_process').spawn('docker-compose', ['up'], {stdio: ['pipe', 'pipe', 'pipe']});
        runningProcess.on('exit', statusCode => {
            console.log('status code', statusCode);
        });

        return new Promise(function (resolve, reject) {
            runningProcess.stdout.on('data', v => {
                const dockerTerminalOutput = v.toString();
                console.log(dockerTerminalOutput);
                // when container server runs, listen for the 'Running container server' output from docker terminal
                if (dockerTerminalOutput.includes('Running container server')) {
                    resolve('SUCCESS');
                }
            });
            runningProcess.stderr.on('data', e => {
                console.log(e.toString());
            });
        });
    })
    .catch(console.error);

    return preppingAllWork;
};

module.exports = runContainer;
