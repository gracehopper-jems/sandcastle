import React from 'react';
import firebase from 'firebase';

import { cssFirepad } from '../firepads';

export default class CSSEditor extends React.Component {

  constructor(props){
    super(props)
    // this.init = this.init.bind(this);
  }


  // componentDidMount(){
  //   this.init();
  // }


  // init(){
  //   // Get Firebase Database reference.
  //   var cssFirepadRef = firebase.database().ref('/css');

  //   // Create CodeMirror (with lineWrapping on).
  //   var codeMirror = CodeMirror(document.getElementById('firepad-container'), {
  //         lineWrapping: true,
  //         lineNumbers: true,
  //         mode: 'css',
  //         matchBrackets: true,
  //         autoCloseBrackets: true,
  //         // matchTags: true,
  //         autoCloseTags: true,
  //         toggleComment: true,
  //         foldCode: true,
  //         hint: true,
  //     });

  //   // Create Firepad (with rich text toolbar and shortcuts enabled).
  //     let cssFirepad = Firepad.fromCodeMirror(cssFirepadRef, codeMirror, {
  //       richTextShortcuts: false,
  //       richTextToolbar: false,
  //       defaultText: 'CSS here!'
  //     });

  //     const self = this;
  //     cssFirepad.on('ready', function() {
  //       // Firepad is ready.
  //       self.props.handlers.handleCSSUpdate(cssFirepad.getText());
  //       // self.props.handlers.handleHTMLCSSJSUpdate(firepad.getText());
  //     });
  //     cssFirepad.on('synced', function(isSynced) {
  //       // isSynced will be false immediately after the user edits the pad,
  //       // and true when their edit has been saved to Firebase.
  //       if (isSynced) {
  //         self.props.handlers.handleCSSUpdate(cssFirepad.getText());
  //         // self.props.handlers.handleHTMLCSSJSUpdate(firepad.getText());
  //       }
  //     });

  // }

  render() {
    console.log('props in css', this.props);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div id="firepad-container"></div>
          </div>
          <div className="col-md-6">
            <img src="https://storage.googleapis.com/material-design/publish/material_v_10/assets/0Bx4BSt6jniD7MG80dmpHT0RidGs/style_icons_system_intro_principles_actionable.png"></img>
          </div>
        </div>
      </div>
    )
  }
}
