/*  ====================
	PRODUCTION VARIABLES 
	====================  */ 


const postgresPath = 'postgres://localhost:5432/sandcastle'; 

const dockerCmd = 'docker'; 

const ipAddress = 'http://localhost:8080'; 



/*  ====================
	DEPLOYED VARIABLES 
	====================  */ 

// const postgresPath = 'postgres://sandcastles:sandcastles@localhost:5432/sandcastles'

// const dockerCmd = 'sudo docker'; 

// const ipAddress = ??????



module.exports = { 
	postgresPath, 
	dockerCmd,  
	ipAddress
}; 