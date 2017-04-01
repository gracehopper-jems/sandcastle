/*  ====================
	PRODUCTION VARIABLES
	====================  */


const postgresPath = 'postgres://localhost:5432/sandcastle';

const dockerCmd = 'docker';

const ipAddress = 'http://localhost:8080';

const appURL = 'http://localhost:3000';



/*  ====================
	DEPLOYED VARIABLES
	====================  */

// const postgresPath = 'postgres://sandcastles:sandcastles@localhost:5432/sandcastles'

// const dockerCmd = 'sudo docker';

// const ipAddress = ??????

// const appURL = 'http://www.sandcastle.world';



module.exports = {
  	postgresPath,
  	dockerCmd,
  	ipAddress
};
