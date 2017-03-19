import React from 'react';
import {apiKey, authDomain, databaseURL} from '../../secrets';
import firebase from 'firebase';

export default class ServerEditor extends React.Component {

  constructor(props){
    super(props)
    this.init = this.init.bind(this);
  }


  componentDidMount(){
    this.init();
  }


  init(){
    // Get Firebase Database reference.
    var firepadRef = firebase.database().ref('/server');

    // Create CodeMirror (with lineWrapping on).
   var codeMirror = CodeMirror(document.getElementById('firepad'), {
        lineWrapping: true,
        lineNumbers: true,
        mode: 'javascript',
        matchBrackets: true,
        autoCloseBrackets: true,
        // matchTags: true,
        autoCloseTags: true,
        toggleComment: true,
        foldCode: true,
        hint: true
    });

    // Create Firepad (with rich text toolbar and shortcuts enabled).
    var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
      richTextShortcuts: false,
      richTextToolbar: false,
      defaultText: 'Server here!'
    });
  }

  render () {
    return (
      <div id="firepad"></div>
    )
  }
}
