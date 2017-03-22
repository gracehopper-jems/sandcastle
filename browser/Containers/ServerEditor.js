import React from 'react';
import firebase from 'firebase';

export default class ServerEditor extends React.Component {

  constructor(props){
    super(props)
    this.init = this.init.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      text: null
    }
  }

  componentDidMount(){
    this.init();
  }

  init(){
    // Get Firebase Database reference.
    const userId = this.props.user.userId;
    var firepadRef = firebase.database().ref(`/users/${userId}/server`);

    // Create CodeMirror (with lineWrapping on).
   var codeMirror = CodeMirror(document.getElementById('firepad-container'), {
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
      defaultText: `/* We would have to have this already provided for them on their blank text editor */

const express = require('express');
const models = require('./models');
const router = express.Router();

/*
And then they would write out their models below:
**Note: the following is just a hardcoded test I made for us to use**
 */

router.get('/', (req, res) => {
    models.Sandcastle.create({
            name: 'jems'
        })
        .then(() => {
            res.write('Made the first post to your database!')
            res.end();
        })
        .catch(console.error);
});

router.get('/test', (req, res) => {
    models.Sandcastle.create({
            name: 'test of second route'
        })
        .then((test) => {
            res.json(test);
        })
        .catch(console.error);
});

/* And we would provide this for them to make sure they are exporting their router correctly */
module.exports = router;`
    });

    const self = this;
    firepad.on('ready', function() {
      // Firepad is ready.
      self.setState({
         text: firepad.getText()
      })
    });
    firepad.on('synced', function(isSynced) {
      // isSynced will be false immediately after the user edits the pad,
      // and true when their edit has been saved to Firebase.
      if (isSynced) {
        self.setState({
         text: firepad.getText()
        })
      }
    });
  }

  handleSave(){
    this.props.handlers.handleServerUpdate(this.state.text);
  }

  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div id="firepad-container"></div>
            <button
              type="button"
              className="btn btn-info"
              onClick={this.handleSave}>SAVE Server</button>
          </div>
          <div className="col-md-6">
            <img src="https://storage.googleapis.com/material-design/publish/material_v_10/assets/0Bx4BSt6jniD7MG80dmpHT0RidGs/style_icons_system_intro_principles_actionable.png"></img>
          </div>
        </div>
      </div>
    )
  }
}
