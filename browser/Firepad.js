"use strict"

import React, {Component} from 'react';
import firebase from 'firebase';
import CodeMirror from 'codemirror';
import Firepad from 'firepad';



class WritePage extends Component {

	componentDidMount() {
		const firepadRef = firebase.database().ref();

		let myCodeMirror = CodeMirror(document.getElementById('firepad'), { lineWrapping: true });

		let myFirePad = Firepad.fromCodeMirror(firepadRef, myCodeMirror, {richTextShortcuts: true, richTextToolbar: true, defaultText: 'Hello, World!'});
	}

  render() {
    return (
			<div>
				<h1>hello World</h1>
        <div id="firepad"></div>
      </div>
    );
  }
}

export default WritePage;
