const Sequelize = require('sequelize');
const postgresPath = require('../variables').postgresPath; 

const db = new Sequelize(postgresPath, {
	logging: false
});


const User = db.define('user', {
	firebaseId: {
		type: Sequelize.STRING,
		// allowNull: false,
	}
});

const Project = db.define('project', {
	hashedProjectId: {
		type: Sequelize.STRING,
		// allowNull: false,
	},
	code: {
		type: Sequelize.JSON,
	},
	projectName: {
		type: Sequelize.STRING
	}
}
	// {
	// 	hooks: {
	// 		beforeValidate: function (project) {
	// 			// console.log('RANDO STRINGO', randomstring.generate(10));
	// 			project.hashedProjectId = randomstring.generate(10);
	// 		}
	// 	}
	// }
);

Project.belongsTo(User);
User.hasMany(Project);

module.exports = { User, Project, db };
