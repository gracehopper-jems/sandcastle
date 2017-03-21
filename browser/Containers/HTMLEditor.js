import React from 'react';
import firebase from 'firebase';

export default class HTMLEditor extends React.Component {

  constructor(props){
    super(props)
    this.init = this.init.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
    this.MyComponent = this.MyComponent.bind(this);
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
    var firepadRef = firebase.database().ref(`/users/${userId}/html`);

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
    this.props.handlers.handleHTMLUpdate(this.state.text);
  }

    createMarkup(text) {
    return {__html: text};
  }

   MyComponent() {
    return <div dangerouslySetInnerHTML={this.createMarkup(this.state.text)} />;
  }

  render() {
    console.log('props in html', this.props);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <div id="firepad-container"></div>
            <button
              type="button"
              className="btn btn-info"
              onClick={this.handleSave}>SAVE HTML</button>
          </div>
          <div className="col-md-6">
            {this.MyComponent()}
          </div>
        </div>
      </div>
    )
  }
}
