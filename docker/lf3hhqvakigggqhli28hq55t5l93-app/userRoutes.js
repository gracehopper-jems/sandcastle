/* We would have to have this already provided for them on their blank text editor */
			const express = require('express');
			const models = require('./userModels');
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

			router.get('/all', (req, res) => {
              
              models.Sandcastle.findAll()
              .then( (rows) => {
                res.json(rows)
              })
              .catch(console.error); 
              
            })

			router.get('/test', (req, res) => {
			    models.Sandcastle.create({
			            name: 'test of second route'
			        })
			        .then((test) => {
			            res.json(test);
			        })
			        .catch(console.error);
			});

			router.post('/test2', (req, res) => {
			    models.Sandcastle.create({
			            name: req.body.name
			        })
			        .then((test) => {
			            res.json(test);
			        })
			        .catch(console.error);
			});
			router.delete('/test3/:id', (req, res) => {
              models.Sandcastle.findOne({
              	where: {id: req.params.id}
              })
              .then(post => {
                console.log("POST IS", post); 
                return post 
              })
              .then( post => post.destroy() )
              .then( () =>  res.send(req.params.id))
			  .catch(console.error);
			});
			
			router.put('/test4/:id', (req, res) => {
              models.Sandcastle.findOne({
              	where: {id: req.params.id}
              })
              .then(post => {
                console.log("POST IS", post); 
                return post 
              })
              .then( post => post.update({
               	name: req.body.name
              }) )
              .then( (updatedPost) =>  res.json(updatedPost))
			  .catch(console.error);
			});



/* And we would provide this for them to make sure they are exporting their router correctly */
module.exports = router;
