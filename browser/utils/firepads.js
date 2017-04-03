import firebase from 'firebase';
import store from '../store';

export default function makeFirepads() {
	let userId = store.getState().user.userId;

	var cssFirepadRef = firebase.database().ref(`/users/${userId}/css`);
	var htmlFirepadRef = firebase.database().ref(`/users/${userId}/html`);
	var jsFirepadRef = firebase.database().ref(`/users/${userId}/javascript`);
	var serverFirepadRef = firebase.database().ref(`/users/${userId}/server`);
	var databaseFirepadRef = firebase.database().ref(`/users/${userId}/database`);

	let firepads = [
		{ id: 'html-firepad-container', mode: 'xml' },
		{ id: 'css-firepad-container', mode: 'css'},
		{ id: 'js-firepad-container', mode: 'javascript'},
		{id: 'server-firepad-container', mode: 'javascript'},
		{id: 'db-firepad-container', mode: 'javascript'}
	];

	let fires = firepads.map(firepad => {
		return CodeMirror(document.getElementById(firepad.id), {
			lineWrapping: true,
			lineNumbers: true,
			mode: firepad.mode,
			matchBrackets: true,
			autoCloseBrackets: true,
			autoCloseTags: true,
			toggleComment: true,
			foldCode: true,
			hint: true,
			autoRefresh: true,
		});
	});

	const htmlFirepad = Firepad.fromCodeMirror(htmlFirepadRef, fires[0], {
		richTextShortcuts: false,
		richTextToolbar: false,
		defaultText: `<!--write html body here-->`
	});

	const cssFirepad = Firepad.fromCodeMirror(cssFirepadRef, fires[1], {
		richTextShortcuts: false,
		richTextToolbar: false,
		defaultText: `/*write css here*/`
	});

	const jsFirepad = Firepad.fromCodeMirror(jsFirepadRef, fires[2], {
		richTextShortcuts: false,
		richTextToolbar: false,
		defaultText: `/* javascript here!
if you are running frontend js only, click 'run frontend'
if you are running backend js too, click 'run backend'*/`
	});

	// added boilerplate for userroutes and usermodels
	const serverFirepad = Firepad.fromCodeMirror(serverFirepadRef, fires[3], {
		richTextShortcuts: false,
		richTextToolbar: false,
		defaultText: `const express = require('express');
const models = require('./userModels');
const router = express.Router();

// write your routes below

module.exports = router;`
	});

	const databaseFirepad = Firepad.fromCodeMirror(databaseFirepadRef, fires[4], {
		richTextShortcuts: false,
		richTextToolbar: false,
		defaultText: `const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL);

// write your model below

module.exports = {
  db: db,
  // include your model below

}`
	});

	const allFirepads = [[htmlFirepad, cssFirepad, jsFirepad, serverFirepad, databaseFirepad], fires];
	return allFirepads;
}



