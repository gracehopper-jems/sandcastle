// 	TOUR INITIALIZED & STARTED IN LOADING BUTTON
import {browserHistory} from 'react-router';

const tour = new Tour({
	steps: [
		{
			orphan: true,
			title: 'Welcome!',
			content: 'Welcome to Sandcastle! \n Click Next to begin a guided tour of our features. \n We\'ve included a sample app to get you going!',
		},
		{
			element: '#FirepadTabContainer',
			title: 'Text Editors',
			content: 'Here you will find all the text editors...',
		},
		{
			element: '#FirepadTabContainer-tab-1',
			title: 'HTML Editor',
			content: '...in here you can write out your HTML file...',
			duration: 2500,
		},
		{
			element: '#FirepadTabContainer-tab-2',
			title: 'CSS Editor',
			content: '...and here, your stylesheet...',
			duration: 2500,
		},
		{
			element: '#FirepadTabContainer-tab-3',
			title: 'JavaScript Editor',
			content: '...and your JavaScript (frontend and backend!)...',
			duration: 2500,
		},
		{
			element: '#FirepadTabContainer-tab-4',
			title: 'Server Editor',
			content: '...define your routes here...',
			duration: 2500,
		},
		{
			element: '#FirepadTabContainer-tab-5',
			title: 'Database Editor',
			content: '...and your models here!',
			duration: 2500,
		},
		{
			element: '#run-frontend',
			title: 'Run Your Frontend Code',
			content: 'Once you\'ve entered some HTML (and CSS, and JS if you so please), click here on \'Run Frontend\' to view the result in the \'Browser View\' pane to the right',
			duration: 4500,
		},
		{
			element: '#run-backend',
			title: 'Run Your Backend Code',
			content: 'If you\'ve defined any routes or models, click here on \'Run Backend\' (there\'s a lot of logic going on here, please be patient!)',
		},
		{
			orphan: true,
			title: 'NOTE:',
			content: 'If you\'ve required any node modules into your JavaScript file, please \'Run Backend\' to install them!',
		},
		{
			element: '#IframeTabContainer-tab-2',
			title: 'Test Your Routes',
			content: 'Once you\'ve sucessfully run your backend, click on over to the \'Server View\' pane to test out your routes.',
		},
		{
			element: '#formControlsSelect.selectdropdown.form-control',
			title: 'Request Type',
			content: 'Choose which request type you want to make...',
		},
		{
			element: '#route-form',
			title: 'Choose Your Route',
			content: '...and enter your route',
		},
		{
			// element: '',
			orphan: true,
			title: 'Sit back and watch your app build!',
			content: 'If everything is defined correctly, you will see your returned data as a JSON object',
		},
		{
			element: '#IframeTabContainer-tab-3',
			title: 'View Your Database',
			content: 'Click on over to \'Database View\' to see your models!'
		},
		{
			element: '#IframeTabContainer-tab-4',
			title: 'La Pièce de Résistance',
			content: 'And finally, what you\'ve ultimately been waiting for, is your app, rendered in all its shining glory over here in the \'App View\' pane'
		},
		{
			element: '#sandcastle-tour',
			title: 'Want more?',
			content: 'We know its a lot to take in, so if you\'d like to run through this tutorial again at any point just click on the \'Sandcasle\' icon to take another spin!'
		},
		{
			orphan: true,
			title: 'GET CODING!',
			content: 'Go! Now!'
		}
	],
	backdrop: true,
	duration: 4000,
	onEnd: function () {
		browserHistory.push('/');
		window.location.reload();
	}
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



