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
			content: 'Here you will find all the text editors.',
		},
		{
			element: '#FirepadTabContainer-tab-1',
			title: 'HTML Editor',
			content: 'In here you can write out your HTML file.',
			duration: 2500,
		},
		{
			element: '#FirepadTabContainer-tab-2',
			title: 'CSS Editor',
			content: 'And here, your stylesheet!',
			duration: 2500,
		},
		{
			element: '#FirepadTabContainer-tab-3',
			title: 'JavaScript Editor',
			content: 'Your JavaScript...',
			duration: 2500,
		},
		{
			element: '#FirepadTabContainer-tab-4',
			title: 'Server Editor',
			content: 'Your routes...',
			duration: 2500,
		},
		{
			element: '#FirepadTabContainer-tab-5',
			title: 'Database Editor',
			content: 'And your models!',
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
			content: 'If you\'ve defined any routes or models, click here on \'Run Full App\' (there\'s a lot of logic going on here, so please be patient!)',
		},
		{
			orphan: true,
			title: 'NOTE:',
			content: 'If you\'ve required any node modules into your JavaScript file, please \'Run Full App\' to install them!',
		},
		{
			element: '#IframeTabContainer-tab-2',
			title: 'Test Your Routes',
			content: 'Once you\'ve sucessfully run your backend, click on over to the \'Server View\' pane to test out your routes.',
		},
		{
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
			content: 'Go! Now!!!'
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
