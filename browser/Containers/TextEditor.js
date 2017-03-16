import React from 'react';
import {apiKey, authDomain, databaseURL} from '../../secrets';

export default class TextEditor extends React.Component {

  constructor(props){
    super(props)
    this.init = this.init.bind(this);
  }


  componentDidMount(){
    this.init();
  }


  init(){
    var config = {
      apiKey: apiKey,
      authDomain: authDomain,
      databaseURL: databaseURL,
    };
    firebase.initializeApp(config);

    // Get Firebase Database reference.
    var firepadRef = firebase.database().ref();

    // Create CodeMirror (with lineWrapping on).
   var codeMirror = CodeMirror(this.refs.firepad, { lineWrapping: true });

    // Create Firepad (with rich text toolbar and shortcuts enabled).
    var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
      richTextShortcuts: true,
      richTextToolbar: true,
      defaultText: 'Hello World!'
    });

  }


  render () {
    return (
      <div ref="firepad"></div>
    )
  }
}
