'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const {resolve} = require('path');
const PrettyError = require('pretty-error');
const finalHandler = require('finalhandler');
const session = require('express-session');
const containerRoutes = require('./routes/containerRoutes');
const userRoutes = require('./routes/userRoutes');
const models = require('./models');
const Project = models.Project;
const db = models.db;

// add user ports as process environment variables
process.env.userServerPort = 8080;
process.env.userPostgresPort = 5432;

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

  .use('/api', userRoutes)
  .use('/', containerRoutes)


  // Send index.html for anything else.
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, 'public', 'index.html')))


  // Error middleware interceptor, delegates to same handler Express uses.
  // https://github.com/expressjs/express/blob/master/lib/application.js#L162
  // https://github.com/pillarjs/finalhandler/blob/master/index.js#L172


  db.sync({force: true})
    .then(() => {
      const server = app.listen(
        3000,
        () => {
          console.log(`--- Started HTTP Server ---`);
          const { address, port } = server.address();
          const host = address === '::' ? 'localhost' : address;
          const urlSafeHost = host.includes(':') ? `[${host}]` : host;
          console.log(`Listening on http://${urlSafeHost}:${port}`);
        }
      );
    });

  app.use((err, req, res, next) => {
    console.error(prettyError.render(err))
    finalHandler(req, res)(err)
  });
// const server = app.listen(
//   3000,
//   () => {
//     console.log(`--- Started HTTP Server ---`);
//     const { address, port } = server.address();
//     const host = address === '::' ? 'localhost' : address;
//     const urlSafeHost = host.includes(':') ? `[${host}]` : host;
//     console.log(`Listening on http://${urlSafeHost}:${port}`);
//   }
// )

