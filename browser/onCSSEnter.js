import React from 'react';
import firebase from 'firebase';


export const cssInit = () => {

	var cssFirepadRef = firebase.database().ref('/css');

	// Create CodeMirror (with lineWrapping on).
	var codeMirror = CodeMirror(document.getElementById('firepad-container'), {
				lineWrapping: true,
				lineNumbers: true,
				mode: 'css',
				matchBrackets: true,
				autoCloseBrackets: true,
				// matchTags: true,
				autoCloseTags: true,
				toggleComment: true,
				foldCode: true,
				hint: true,
		});

		// Create Firepad (with rich text toolbar and shortcuts enabled).
		export const cssFirepad = Firepad.fromCodeMirror(cssFirepadRef, codeMirror, {
			richTextShortcuts: false,
			richTextToolbar: false,
			defaultText: 'CSS here!'
		});

		const self = this;
		cssFirepad.on('ready', function() {
			// Firepad is ready.
			self.props.handlers.handleCSSUpdate(cssFirepad.getText());
			// self.props.handlers.handleHTMLCSSJSUpdate(firepad.getText());
		});
		cssFirepad.on('synced', function(isSynced) {
			// isSynced will be false immediately after the user edits the pad,
			// and true when their edit has been saved to Firebase.
			if (isSynced) {
				self.props.handlers.handleCSSUpdate(cssFirepad.getText());
				// self.props.handlers.handleHTMLCSSJSUpdate(firepad.getText());
			}
		});
}

	// this.setState({ cssFirepad: cssFirepad });
