import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateHTML, updateCSS, updateJS, updateServer, updateDatabase} from '../reducers/code';
import {sendJson} from '../reducers/docker.js';
import {setUserId} from '../reducers/user';
import { IframeTabs } from '../Components/IframeTabs';
import { FirepadTabs } from '../Components/FirepadTabs';
import NavbarContainer from './NavbarContainer';
import WelcomeMessage from '../Components/WelcomeMessage';

class AppContainer extends Component {
  constructor(props){
    super(props)
  }

  render(){
    console.log("USER ID:", this.props.user.userId);
    if (this.props.user.userId) {
      window.addEventListener("beforeunload", function (e) {
        console.log('windowww')
        var confirmationMessage = "\o/";
        e.returnValue = confirmationMessage;
        return confirmationMessage;
      });
    }
    return (
        <div>
          <NavbarContainer code={this.props.code} handlers={this.props.handlers} user={this.props.user} children={this.props.children} />
          {this.props.user.userId === ""
            ? (<WelcomeMessage />)
            :
            (<div className='giant-container'>
              <div className='editor-container'>
                <FirepadTabs />
              </div>
              <div className='iframe-container'>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-6">
                        <IframeTabs docker={this.props.docker} handlers={this.props.handlers} />
                    </div>
                  </div>
                </div>
              </div>
            </div>)
          }
          </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    code: state.code,
    user: state.user,
    docker: state.docker
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
        },
        handleSendJson(...args){
          dispatch(sendJson(...args));
        }
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
