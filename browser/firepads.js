import firebase from 'firebase';
import {apiKey, authDomain, databaseURL} from '../secrets';

// export function initialize() {
	// var config = { apiKey, authDomain, databaseURL };
	// firebase.initializeApp(config);
// // }
import store from './store';


export default function makeFirepads() {
	let userId = store.getState().user.userId;
	console.log('GOT HERE', userId);


	var cssFirepadRef = firebase.database().ref(`/users/${userId}/css`);
	var htmlFirepadRef = firebase.database().ref(`/users/${userId}/html`);
	var jsFirepadRef = firebase.database().ref(`/users/${userId}/javascript`);
	var serverFirepadRef = firebase.database().ref(`/users/${userId}/server`);
	var databaseFirepadRef = firebase.database().ref(`/users/${userId}/database`);

	let firepads = [{ id: 'html-firepad-container', mode: 'xml' }, { id: 'css-firepad-container', mode: 'css'}, { id: 'js-firepad-container', mode: 'javascript'}, {id: 'server-firepad-container', mode: 'javascript'}, {id: 'db-firepad-container', mode: 'javascript'}];

	let fires = firepads.map(firepad => {
		return CodeMirror(document.getElementById(firepad.id), {
			lineWrapping: true,
			lineNumbers: true,
			mode: firepad.mode,
			matchBrackets: true,
			autoCloseBrackets: true,
			// matchTags: true,
			autoCloseTags: true,
			toggleComment: true,
			foldCode: true,
			hint: true,
		});
	});

	// export const codeMirror = CodeMirror(document.getElementById(firepadId), {
	// 		lineWrapping: true,
	// 		lineNumbers: true,
	// 		mode: 'css',
	// 		matchBrackets: true,
	// 		autoCloseBrackets: true,
	// 		// matchTags: true,
	// 		autoCloseTags: true,
	// 		toggleComment: true,
	// 		foldCode: true,
	// 		hint: true,
	// });

	console.log('fires', fires);

	const htmlFirepad = Firepad.fromCodeMirror(htmlFirepadRef, fires[0], {
		richTextShortcuts: false,
		richTextToolbar: false,
		defaultText: 'HTML HERE!'
	});

	const cssFirepad = Firepad.fromCodeMirror(cssFirepadRef, fires[1], {
		richTextShortcuts: false,
		richTextToolbar: false,
		defaultText: 'CSS here!'
	});

	const jsFirepad = Firepad.fromCodeMirror(jsFirepadRef, fires[2], {
		richTextShortcuts: false,
		richTextToolbar: false,
		defaultText: 'JS HERE!'
	});

	const serverFirepad = Firepad.fromCodeMirror(serverFirepadRef, fires[3], {
		richTextShortcuts: false,
		richTextToolbar: false,
		defaultText: 'SERVER CODE HERE!'
	});

	const databaseFirepad = Firepad.fromCodeMirror(databaseFirepadRef, fires[4], {
		richTextShortcuts: false,
		richTextToolbar: false,
		defaultText: 'MODELS HERE!'
	});

	let allFirepads = [htmlFirepad, cssFirepad, jsFirepad, serverFirepad, databaseFirepad];

	return allFirepads;
}



