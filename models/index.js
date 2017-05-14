const Sequelize = require('sequelize');
const postgresPath = require('../variables').postgresPath;

const db = new Sequelize(postgresPath, {
	logging: false
});


const User = db.define('user', {
	firebaseId: {
		type: Sequelize.STRING
	}
});

const Project = db.define('project', {
	hashedProjectId: {
		type: Sequelize.STRING
	},
	code: {
		type: Sequelize.JSON,
	},
	projectName: {
		type: Sequelize.STRING
	}
});

Project.belongsTo(User);
User.hasMany(Project);

module.exports = { User, Project, db };
