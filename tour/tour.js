// import { Tour } from 'bootstrap-tour';
// console.log(Tour);

const tour = new Tour({
	steps: [
		{
			element: '#run-frontend',
			title: 'Text Editors',
			content: 'Here you will find the editors to write your code in'
		},
	]
});

export default tour;
