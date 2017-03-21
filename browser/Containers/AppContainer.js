import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router';
import HTMLEditor from './HTMLEditor';
import {toggleLogIn, setUserId} from '../reducers/user';
import firebase from 'firebase';
import { updateHTML, updateCSS, updateJS, updateServer, updateDatabase, updateHTMLCSSJS } from '../reducers/code';
import LoadingButton from './LoadingButton';

class AppContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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
