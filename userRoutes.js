const express = require('express');
const router = express.Router();

const User = require('./models').User;
const Project = require('./models').Project;

router.post('/:firebaseId', (req, res, next) => {
	User.findOrCreate({
		where: {
			firebaseId: req.params.firebaseId
		}
	})
		.spread(user => {
			Project.create(req.body)
				.then(createdProject => {
					createdProject.setUser(user);
				})
				.then(() => {
					res.status(201);
				})
				.catch(next);
		})
		.catch(console.error);
});

router.get('/:firebaseId', (req, res, next) => {
	User.findOne({ where: { firebaseId: req.params.firebaseId } })
		.then(user => {
			return user.getProjects();
		})
		.then(projects => {
			console.log('PROJECTS', projects);
			res.status(200).send(projects);
		})
		.catch(next);
});

module.exports = router;


