// import { Tour } from 'bootstrap-tour';
// console.log(Tour);

const tour = new Tour({
	steps: [
		{
			element: '#run-frontend',
			title: 'Text Editors',
			content: 'Here you will find the editors to write your code in'
		},
		// {
		// 	element: '',
		// 	title: '',
		// 	content: ''
		// },
	]
});

export default tour;



// TOUR steps
// 1. User signs up
// 2. User enters app and tour initializes, asking them if they want to continue
// 3. Things to cover in tour:
// 			a. 	Intro - 'Sandcastle is an in-browser sandbox for running your app. 							Enter javascript, html, and css files to render a frontend view, or 						add backend routes and models to see your app come to life.' -
// 			b. 	Point to HTML, CSS, and JS pads -
// 			c. 	Point to 'Run Frontend' button - #run-frontend
// 			d. 	Point to 'Browser iframe tab' -
// 			e. 	Point to Server and Database pads -
// 			f. 	Point to 'Run Backend' button -
// 			g. 	Point to Server iframe tab -
// 			h. 	Point to Database iframe tab -
// 			i. 	Point to App view iframe tab -
// 			j. 	That's it! When you log in next time your work will be waiting for 							you! -

// 	ADD CLEAR ALL PADS button
// 	ADD SAVE APP BUTTON AND GIVE THEM A SHAREABLE LINK AND A PAGE TO REVISIT 				PAST APPS



