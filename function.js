const Promise = require('bluebird');
const fs = require('fs');

const userPackageJson = `{
  "name": "docker-test",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "bluebird": "^3.4.6",
    "body-parser": "^1.15.0",
    "morgan": "^1.7.0",
    "express": "^4.13.3",
    "pg": "^4.5.3",
    "pg-hstore": "^2.3.2",
    "sequelize": "^3.21.0",
    "retry": "^0.7.0"
  }
}`;

const userServer = `const retry = require('retry');
const pg = require('pg');
const models = require('./models');
const db = models.db;
const express = require('express');
const userRoutes = require('./userRoutes');
const operation = retry.operation({ retries: 3 });
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
        server.use('/', userRoutes);
        db.sync({ force: true })
            .then(() => {
                server.listen(PORT, () => {
                    console.log(process.env.DATABASE_URL);
                    console.log('Running on port', PORT);
                });
            })
    })
})` ;

const userRoutes = `/* We would have to have this already provided for them on their blank text editor */
const express = require('express');
const models = require('./models');
const router = express.Router();
/*
And then they would write out their models below:
**Note: the following is just a hardcoded test I made for us to use**
 */
router.get('/', (req, res) => {
    models.Sandcastle.create({
            name: 'jems'
        })
        .then(() => {
            res.write('Made the first post to your database!')
            res.end();
        })
        .catch(console.error);
});
router.get('/test', (req, res) => {
    models.Sandcastle.create({
            name: 'test of second route'
        })
        .then((test) => {
            res.json(test);
        })
        .catch(console.error);
});
/* And we would provide this for them to make sure they are exporting their router correctly */
module.exports = router;`;

const userModels = `/* We would need to provide the below for them  at the start of their empty file */
const Sequelize = require('sequelize');
console.log("*********DATABASE URL:************", process.env.DATABASE_URL);
const db = new Sequelize(process.env.DATABASE_URL);
/* they would right out their models within our online text editor like below (again, below is just a hard-coded test) */
const Sandcastle = db.define('Sandcastle', {
    name: Sequelize.STRING
})
/* and then we would have to provide the module.exports for them too I think */
module.exports = {
    db: db, // we would provide this for them
    Sandcastle: Sandcastle // but they would have to add in all the tables they defined
}`;

const dockerCompose = `db:
  image: postgres
  ports:
    - 6542:5432
  environment:
    POSTGRES_USER: username
    POSTGRES_PASSWORD: pgpassword
    POSTGRES_DB: docker-test
wikistack:
  build: .
  ports:
    - 3001:8080
  links:
    - db
  environment:
    SEQ_DB: docker-test
    SEQ_USER: username
    SEQ_PW: pgpassword
    PORT: 8080
    DATABASE_URL: postgres://username:pgpassword@db:5432/docker-test
`;

const dockerFile = `FROM node:boron
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 8080

CMD [ "npm", "start" ]`;

const dockerFunc = () => {
    //promisified child process exec
    const exec = Promise.promisify(require('child_process').exec);
    const writeFile = Promise.promisify(fs.writeFile);

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
        console.log('creating a package.json');
        return writeFile('package.json', userPackageJson);
    })
    .then(() => {
        // write user server to user-app folder
        console.log('creating the server');
        return writeFile('server.js', userServer);
    })
    .then(() => {
        // write user models to user-app folder
        console.log('creating the user models');
        return writeFile('models.js', userModels);
    })
    .then(() => {
        // write user routes to user-app folder
        console.log('creating the user routes');
        return writeFile('userRoutes.js', userRoutes);
    })
    .then(() => {
        // write docker-compose to user-app folder
        console.log('creating docker-compose');
        return writeFile('docker-compose.yml', dockerCompose);
    })
    .then(() => {
        // write dockerFile to user-app folder
        console.log('creating docker file');
        return writeFile('Dockerfile', dockerFile);
    })
    // docker-compose also works without lines below?
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
    // does not reach below
    .then((res) => {
        console.log('====got here');
        console.log(res);
        // console.log(`docker stdout: ${stdout}`);
        // console.log(`docker stderr: ${stderr}`);
    })
    // .then(() => {
    //   // stop docker container
    //   console.log('running docker-compose down');
    //   return exec('docker-compose down');
    // })
    .catch(console.error);

};

dockerFunc();
