// import firebase from 'firebase';
// import {apiKey, authDomain, databaseURL} from '../secrets';

// // export function initialize() {
// 	var config = { apiKey, authDomain, databaseURL };
// 	firebase.initializeApp(config);
// // // }
// export default function makeFirepads(type) {

// }

// var cssFirepadRef = firebase.database().ref('/css');
// var htmlFirepadRef = firebase.database().ref('/html');
// var jsFirepadRef = firebase.database().ref('/javascript');
// var serverFirepadRef = firebase.database().ref('/server');
// var databaseFirepadRef = firebase.database().ref('/database');

// export const codeMirror = CodeMirror(document.getElementById('firepad-container'), {
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

// export const cssFirepad = Firepad.fromCodeMirror(cssFirepadRef, codeMirror, {
// 	richTextShortcuts: false,
// 	richTextToolbar: false,
// 	defaultText: 'CSS here!'
// });

// export const htmlFirepad = Firepad.fromCodeMirror(htmlFirepadRef, codeMirror, {
// 	richTextShortcuts: false,
// 	richTextToolbar: false,
// 	defaultText: 'HTML HERE!'
// });

// export const jsFirepad = Firepad.fromCodeMirror(jsFirepadRef, codeMirror, {
// 	richTextShortcuts: false,
// 	richTextToolbar: false,
// 	defaultText: 'HTML HERE!'
// });

// export const serverFirepad = Firepad.fromCodeMirror(serverFirepadRef, codeMirror, {
// 	richTextShortcuts: false,
// 	richTextToolbar: false,
// 	defaultText: 'HTML HERE!'
// });

// export const databaseFirepad = Firepad.fromCodeMirror(databaseFirepadRef, codeMirror, {
// 	richTextShortcuts: false,
// 	richTextToolbar: false,
// 	defaultText: 'HTML HERE!'
// });


