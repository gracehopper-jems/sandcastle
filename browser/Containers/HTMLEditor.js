import React from 'react';
import firebase from 'firebase';

export default class HTMLEditor extends React.Component {

  constructor(props){
    super(props)
    this.init = this.init.bind(this);
  }


  componentDidMount(){
    this.init();
  }

  init(){
    // Get Firebase Database reference.
    var firepadRef = firebase.database().ref('/html');

    // Create CodeMirror (with lineWrapping on).
    var codeMirror = CodeMirror(document.getElementById('firepad-container'), {
        lineWrapping: true,
        lineNumbers: true,
        mode: 'xml',
        htmlMode: true,
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
      defaultText: 'HTML here!'
    });

    firepad.on('synced', function(isSynced) {
      // isSynced will be false immediately after the user edits the pad,
      // and true when their edit has been saved to Firebase.
      if (isSynced) {
        console.log('====', firepad.getText());
      }
    });

  }

  render () {
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
