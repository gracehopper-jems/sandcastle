import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Link, browserHistory } from 'react-router';
import HTMLEditor from './HTMLEditor';
import CSSEditor from './CSSEditor';
import JSEditor from './JSEditor';
import ServerEditor from './ServerEditor';
import DatabaseEditor from './DatabaseEditor';
import {updateHTML, updateCSS, updateJS, updateServer, updateDatabase} from '../reducers/code';
import {setUserId} from '../reducers/user';
import firebase from 'firebase';
import LoadingButton from './LoadingButton';
import BackendButton from '../Components/BackendButton';

class AppContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: "",
      currentFirepad: 'html'
    }
    this.handleSignin = this.handleSignin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleChange(event){
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }

  handleSignin(event){
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then( () => {
      const user = firebase.auth().currentUser;
      console.log('user on sign in', user)
      const userId = user.uid;
      this.props.handlers.handleSignin(userId);
    })
    .catch(err => alert("Invalid log in!"))
  }

  handleSignout(event) {
    event.preventDefault();
    this.setState({email: '', password: ''});
    firebase.auth().signOut()
    .then(() => {
      this.props.handlers.handleSignout();
    })
    .catch(console.error)
  }

  handleSignup(event) {
    event.preventDefault();
    browserHistory.push('/signup');
  }

  onHTMLClick() {
    this.setState({ currentFirepad: 'html' });
  }
  onCSSClick() {
    this.setState({ currentFirepad: 'css' });
  }
  onJSClick() {
    this.setState({ currentFirepad: 'js' });
  }
  onServerClick() {
    this.setState({ currentFirepad: 'server' });
  }
  onDatabaseClick() {
    this.setState({ currentFirepad: 'db' });
  }

  render(){

    let htmlDisplay = this.state.currentFirepad === 'html' ? 'block' : 'none';
    let cssDisplay = this.state.currentFirepad === 'css' ? 'block' : 'none';
    let jsDisplay = this.state.currentFirepad === 'js' ? 'block' : 'none';
    let serverDisplay = this.state.currentFirepad === 'server' ? 'block' : 'none';
    let dbDisplay = this.state.currentFirepad === 'db' ? 'block' : 'none';


    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        code: this.props.code,
        handlers: this.props.handlers,
        user: this.props.user
      })
    });

    return (
        <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                  <div className="navbar-header">
                      <Link className="navbar-brand" to="/">Text Editor</Link>
                  </div>

                  <ul className="nav navbar-nav nav-tabs">

                    <li><a href="#" id="html" onClick={() => this.onHTMLClick()} >HTML</a></li>
                    <li><a href="#" id="css" onClick={() => this.onCSSClick()}>CSS</a></li>
                    <li><a href="#" id="js" onClick={() => this.onJSClick()}>JS</a></li>
                    <li><a href="#" id="server" onClick={() => this.onServerClick()}>Server</a></li>
                    <li><a href="#" id="db" onClick={() => this.onDatabaseClick()}>Database</a></li>

                  </ul>

                  {this.props.user.userId !== ""
                    ?
                    <ul className="nav navbar-nav navbar-right">
                    <li>
                    <button className="btn btn-primary" onClick={this.handleSignout}>Sign Out</button>
                    </li>
                    </ul>
                    :
                     <form className="form-inline" onSubmit={this.handleSignin} >
                        <ul className="nav navbar-nav navbar-right">
                          <li>
                            <label className="sr-only" htmlFor="inlineFormInput">Email</label>
                            <input name="email" type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Email" onChange={this.handleChange} />
                          </li>
                          <li>
                            <label className="sr-only" htmlFor="inlineFormInputGroup">Password</label>
                            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                              <input name="password" type="password" className="form-control" id="inlineFormInputGroup" placeholder="Password" onChange={this.handleChange}/>
                            </div>
                          </li>
                          <li>
                            <button type="submit" className="btn btn-primary">Sign In</button>
                          </li>
                          <li>
                            <button type="submit" className="btn btn-info" onClick={this.handleSignup} >Sign Up</button>
                          </li>
                        </ul>
                      </form>
                  }
              </div>
            </nav>

            <LoadingButton code={this.props.code} handlers={this.props.handlers} />
            <BackendButton code={this.props.code} handlers={this.props.handlers} user={this.props.user}/>
            {children}

          <div className='giant-container'>
              <div className='editor-container'>
                <HTMLEditor style={{ display: htmlDisplay }} user={this.props.user} code={this.props.code} handlers={this.props.handlers} />

                <CSSEditor style={{ display: cssDisplay }} user={this.props.user} code={this.props.code} handlers={this.props.handlers} />

                <JSEditor style={{ display: jsDisplay }} user={this.props.user} code={this.props.code} handlers={this.props.handlers} />

                <ServerEditor style={{ display: serverDisplay }} user={this.props.user} code={this.props.code} handlers={this.props.handlers} />

                <DatabaseEditor style={{ display: dbDisplay }} user={this.props.user} code={this.props.code} handlers={this.props.handlers} />
              </div>
              <div className='iframe-container'>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6">
                      <div id="frame" />
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    code: state.code,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {handlers:
      {
        handleHTMLUpdate(...args) {
          dispatch(updateHTML(...args));
        },
        handleCSSUpdate(...args) {
          dispatch(updateCSS(...args));
        },
        handleJSUpdate(...args) {
          dispatch(updateJS(...args));
        },
        handleServerUpdate(...args) {
          dispatch(updateServer(...args));
        },
        handleDatabaseUpdate(...args) {
          dispatch(updateDatabase(...args));
        },
        handleSignin(...args) {
          dispatch(setUserId(...args));
        },
        handleSignout(...args){
          dispatch(setUserId(''));
        }
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
