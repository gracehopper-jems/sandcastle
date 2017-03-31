/*  ====================
	PRODUCTION VARIABLES 
	====================  */ 


// const postgresPath = 'postgres://localhost:5432/sandcastle'; 

// const dockerCmd = 'docker'; 

// const ipAddress = 'http://localhost:8080'; 

// const appURL = 'http://localhost:3000';

// const const dockerComposeCmd = 'docker-compose'; 



/*  ====================
	DEPLOYED VARIABLES 
	====================  */ 

const postgresPath = 'postgres://sandcastles:sandcastles@localhost:5432/sandcastles'

const dockerCmd = 'docker'; 

const dockerComposeCmd = 'docker-compose'; 

const ipAddress = 'http://localhost:8080'; 

const appURL = 'http://www.sandcastle.world'; 



module.exports = { 
	postgresPath, 
	dockerCmd, 
	dockerComposeCmd,  
	ipAddress, 
	appURL
}; 