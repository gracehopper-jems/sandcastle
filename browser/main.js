'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Promise } from 'bluebird';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import AppContainer from './Containers/AppContainer';
import SignUp from './Containers/SignUp';
import {apiKey, authDomain, databaseURL} from '../secrets';
import firebase from 'firebase';
import store from './store';
import { setUserId } from './reducers/user';
import makeFirepads from './utils/firepads';
import * as updateActions from './reducers/code';
import makeFrontendIframe from './utils/makeFrontendIframe';


injectTapEventPlugin(); //need this for the progress indicator

const onAppEnter = () => {

  // initialize firebase
  var config = { apiKey, authDomain, databaseURL };
  firebase.initializeApp(config);

  let madeFirepads = false;

  firebase.auth().onAuthStateChanged((user) => {
    console.log("USER IN ON APP ENTER", user);

    if (user) {
      let userId = user.uid;
      store.dispatch(setUserId(userId));

      axios.post('/setUser', {userId: userId})
      .then(() => {
          console.log('posting userid');
      })
      .catch(console.error);

      // if user is logged in add an event listener to window to check if user is leaving page
      // send get request to server to remove container if container is running
      window.addEventListener("beforeunload", function (e) {
        e.preventDefault();
        console.log('WINDOW');
        console.log('EVENT');

        axios.get('/removeContainer')
        .then((res) => {
          console.log('removing container');
          console.log('res', res)
        })
        .catch(console.error);

        // var confirmationMessage = "\o/";
        // e.returnValue = confirmationMessage;
        // return confirmationMessage;
      });

      // render firepads
      if (madeFirepads === false) {
        let firepads = makeFirepads();
        let allFirepads = firepads[0];
        let orderManifesto = ['HTML', 'CSS', 'JS', 'Server', 'Database'];

        madeFirepads = true;

        // creating firepads and updating state with text
        Promise.map(allFirepads, (pad, i) => {
          return new Promise((resolve, reject) => {
            pad.on('ready', () => {
              store.dispatch(updateActions[`update${orderManifesto[i]}`](pad.getText()));
              // count++;
              resolve();
            });
          });
        })
        // making the iFrames
        .then(() => {
          makeFrontendIframe();
          })
        // setting up event listeners to update state with new text every time firepads are edited
        .then(() => {
          Promise.map(allFirepads, (pad, i) => {
            return new Promise((resolve, reject) => {
              pad.on('synced', isSynced => {
                if (isSynced) {
                  store.dispatch(updateActions[`update${orderManifesto[i]}`](pad.getText()));
                  resolve();
                }
              });
            });
          })
          .catch(console.error);
        });
      }
    } else {
      store.dispatch(setUserId(''));
    }
  });
};

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer} onEnter={onAppEnter}>
        <Route path="/signup" component={SignUp} />
      </Route>
    </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
