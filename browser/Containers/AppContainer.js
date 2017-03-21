import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router';
import HTMLEditor from './HTMLEditor';
import CSSEditor from './CSSEditor';
import JSEditor from './JSEditor';
import ServerEditor from './ServerEditor';
import DatabaseEditor from './DatabaseEditor';
import {updateHTML, updateCSS, updateJS, updateServer, updateDatabase} from '../reducers/code';
import {toggleLogIn, setUserId} from '../reducers/user';
import firebase from 'firebase';
import LoadingButton from './LoadingButton';

class AppContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: "",
      currentFirepad: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    // this.onListClick = this.onListClick.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then( () => {
      const user = firebase.auth().currentUser;
      const userId = user.uid;
      this.props.handlers.handleLogIn(userId);
    })
    .catch(err => alert("Invalid log in!"))
  }

  handleLogout(event) {
    event.preventDefault();
    firebase.auth().signOut()
    .then(() => {
      this.props.handlers.handleLogOut();
    })
    .catch(console.error)
  }

  handleChange(event){
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value })
  }

  // onListClick(id) {
  //   console.log('is this working?');
  //   console.log('id', id);
  //   if (id === 'html') this.setState({ currentFirepad: <HTMLEditor /> });
  //   if (id === 'css') this.setState({ currentFirepad: <CSSEditor /> });
  //   if (id === 'js') this.setState({ currentFirepad: <JSEditor /> });
  //   if (id === 'server') this.setState({ currentFirepad: <ServerEditor /> });
  //   if (id === 'db') this.setState({ currentFirepad: <DatabaseEditor /> });
  // }

  onHTMLClick() {
    this.setState({ currentFirepad: <HTMLEditor user={this.props.user} code={this.props.code} handlers={this.props.handlers} /> });
    console.log(this.state);
  }
  onCSSClick() {
  this.setState({ currentFirepad: <CSSEditor user={this.props.user} code={this.props.code} handlers={this.props.handlers} /> });
  console.log(this.state);
  }
  onJSClick() {
  this.setState({ currentFirepad: <JSEditor user={this.props.user} code={this.props.code} handlers={this.props.handlers} /> });
  console.log(this.state);
  }
  onServerClick() {
  this.setState({ currentFirepad: <ServerEditor user={this.props.user} code={this.props.code} handlers={this.props.handlers} /> });
  console.log(this.state);
  }
  onDatabaseClick() {
  this.setState({ currentFirepad: <DatabaseEditor user={this.props.user} code={this.props.code} handlers={this.props.handlers} /> });
  console.log(this.state);
  }

  render(){

    // const children = React.Children.map(this.props.children, (child) => {
    //   return React.cloneElement(child, {
    //     code: this.props.code,
    //     handlers: this.props.handlers,
    //     user: this.props.user
    //   })
    // });

    console.log('react kids', this.props.children);
    let FirepadDisplay = this.state.currentFirepad;

    return (
        <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                  <div className="navbar-header">
                      <Link className="navbar-brand" to="/">Text Editor</Link>
                  </div>
                  <ul className="nav navbar-nav nav-tabs">
              <li><a href="#" id="html" onClick={() => this.onHTMLClick()} >HTML</a></li>
                      {/*<li><Link to="/css">CSS</Link></li>
                      <li><Link to="/javascript">Javascript</Link></li>
                      <li><Link to="/server">Server</Link></li>
                      <li><Link to="/database">Database</Link></li>*/}
                      <li><a href="#" id="css"
                      onClick={() => this.onCSSClick()}>CSS</a></li>
                      <li><a href="#" id="js" onClick={() => this.onJSClick()}>JS</a></li>
                      <li><a href="#" id="server" onClick={() =>this.onServerClick()}>Server</a></li>
                      <li><a href="#" id="db" onClick={() => this.onDatabaseClick()}>Database</a></li>
                  </ul>
                  {this.props.user.userId !== ""
                    ? <button type="submit" className="btn btn-primary" onClick={this.handleLogout}>Sign Out</button>
                    :
                     <form className="form-inline" onSubmit={this.handleSubmit} >
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
                            <Link to="/signup"><button type="submit" className="btn btn-secondary">Sign Up</button></Link>
                          </li>
                        </ul>
                      </form>
                  }
              </div>
            </nav>
            <LoadingButton code={this.props.code} handlers={this.props.handlers} />
            {/*children*/}
            {console.log('chitlins', children)}
            {console.log(this.state)}
            {this.state.currentFirepad}
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
        handleLogIn(...args) {
          dispatch(setUserId(...args));
        },
        handleLogOut(...args){
          dispatch(setUserId(''));
        }
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
