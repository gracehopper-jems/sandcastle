import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Link, browserHistory } from 'react-router';
import {updateHTML, updateCSS, updateJS, updateServer, updateDatabase} from '../reducers/code';
import {setUserId} from '../reducers/user';
import firebase from 'firebase';
import LoadingButton from './LoadingButton';
import BackendButton from '../Components/BackendButton';
import { IframeTabs } from '../Components/IframeTabs';
import { FirepadTabs } from '../Components/FirepadTabs';
import NavbarContainer from './NavbarContainer'
import SignUp from './SignUp'
import axios from 'axios';

class AppContainer extends Component {
  constructor(props){
    super(props)
  }

  render(){
    //console.log("APP CONTAINER CHILDREN", this.props.children); 
    return (
        <div>
          <NavbarContainer code={this.props.code} handlers={this.props.handlers} user={this.props.user} children={this.props.children} />
          <div className='giant-container'>
              <div className='editor-container'>
                <FirepadTabs />
              </div>
              <div className='iframe-container'>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6">
                        <IframeTabs />
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
