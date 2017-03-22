import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router';
import HTMLEditor from './HTMLEditor';
import {toggleLogIn, setUserId} from '../reducers/user';
import firebase from 'firebase';
import { updateHTML, updateCSS, updateJS, updateServer, updateDatabase, updateHTMLCSSJS } from '../reducers/code';
import LoadingButton from './LoadingButton';
import {browserHistory} from 'react-router';

class AppContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: ""
    }
    this.handleSignin = this.handleSignin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleSignin(event){
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    console.log('state email', this.state.email)
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then( () => {
      const user = firebase.auth().currentUser;
      console.log('user on sign in', user)
      const userId = user.uid;
      this.props.handlers.handleLogIn(userId);
    })
    .catch(err => alert("Invalid log in!"))
  }

  handleLogout(event) {
    event.preventDefault();
    this.setState({email: '', password: ''});
    firebase.auth().signOut()
    .then(() => {
      this.props.handlers.handleLogOut();
    })
    .catch(console.error)
  }

  handleChange(event){
    const value = event.target.value;
    const name = event.target.name;
    this.setState({ [name]: value });
  }

  handleSignup(event) {
    event.preventDefault();
    browserHistory.push('/signup');
  }

  render(){

    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        code: this.props.code,
        handlers: this.props.handlers,
        user: this.props.user
      })
    });


    return(
        <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                  <div className="navbar-header">
                      <Link className="navbar-brand" to="/">Text Editor</Link>
                  </div>
                  <ul className="nav navbar-nav nav-tabs">
                      <li><Link to="/html">HTML</Link></li>
                      <li><Link to="/css">CSS</Link></li>
                      <li><Link to="/javascript">Javascript</Link></li>
                      <li><Link to="/server">Server</Link></li>
                      <li><Link to="/database">Database</Link></li>
                  </ul>
                  {this.props.user.userId !== ""
                    ?
                    <ul className="nav navbar-nav navbar-right">
                    <li>
                    <button className="btn btn-primary" onClick={this.handleLogout}>Sign Out</button>
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
              {children}
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
