/*
To run Sandcastle in a development environment, comment out the `deployed variables` and un-comment out the `production variables`.

Remember - in two seperate shells:
`npm run build-watch`
`node server.js`

WHEN YOU PUSH TO MASTER, BE SURE TO COMMENT THE DEPLOYMENT VARIABLES BACK IN, AND THE PRODUCTION VARIABLES OUT!!!


	====================
	DEPLOYMENT VARIABLES
	====================  */


const postgresPath = 'postgres://sandcastles:sandcastles@localhost:5432/sandcastles'

const appURL = 'http://www.sandcastle.world';

const apiKey = process.env.API;

const authDomain = process.env.AUTH;

const databaseURL =  process.env.DB;


/*  ====================
	PRODUCTION VARIABLES
	====================  */

// const {apiKey, authDomain, databaseURL} = require('./secrets.js');

// const postgresPath = 'postgres://localhost:5432/sandcastle'

// const appURL = 'http://localhost:3000';



module.exports = {
  	postgresPath,
  	appURL,
    apiKey,
    authDomain,
    databaseURL
};
