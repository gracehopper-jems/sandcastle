'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from './Containers/SignUp';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import AppContainer from './Containers/AppContainer';
import {apiKey, authDomain, databaseURL} from '../secrets';
import firebase from 'firebase';
import store from './store';
import {Provider} from 'react-redux';
import { setUserId } from './reducers/user';
import makeFirepads from './firepads';
import { updateHTML, updateCSS, updateJS, updateServer, updateDatabase } from './reducers/code';
import { handleCodeMirrorInstances } from './reducers/codemirror';
import makeFrontendIframe from './makeFrontendIframe';
import axios from 'axios'; 

const onAppEnter = () => {

  // initialize firebase
  var config = { apiKey, authDomain, databaseURL };
  firebase.initializeApp(config);

  let user = firebase.auth().currentUser;

  let madeFirepads = false;
  let madeFrontendIframe = false;

  firebase.auth().onAuthStateChanged((user) => {
    console.log("USER IN ON APP ENTER", user);
    if (user) {
      let userId = user.uid;
      store.dispatch(setUserId(userId))

      axios.post('/setUser', {userId: userId})
      .then(() => {
          console.log('posting userid');
      })
      .catch(console.error);

    } else {
      store.dispatch(setUserId(''));

    }
    if (madeFirepads === false) {

      let pads = makeFirepads();

      const codeMirrorInstances = pads[1];
      // we can add codemirror instances to store state if necessary
      // store.dispatch(handleCodeMirrorInstances(codeMirrorInstances));
      // setTimeout(() => {
      //   console.log('refreshing code mirrors');
      //   pads[1].forEach(pad => {pad.refresh();});
      // }, 1);

      madeFirepads = true;
      let count = 0;
      pads[0].forEach((pad, i) => {
        pad.on('ready', () => {
          if (i === 0) {
            store.dispatch(updateHTML(pad.getText()));
            count++;
          }
          if (i === 1) {
            store.dispatch(updateCSS(pad.getText()));
            count++;
          }
          if (i === 2) {
            store.dispatch(updateJS(pad.getText()));
            count++;
          }
          if (i === 3) {
            store.dispatch(updateServer(pad.getText()));
            count++;
          }
          if (i === 4) {
            store.dispatch(updateDatabase(pad.getText()));
            count++;
          }
          if (madeFrontendIframe === false && count === 5) {
            makeFrontendIframe();
            madeFrontendIframe = true;
          }
        });
        pad.on('synced', isSynced => {
          if (isSynced) {
            if (i === 0) store.dispatch(updateHTML(pad.getText()));
            if (i === 1) store.dispatch(updateCSS(pad.getText()));
            if (i === 2) store.dispatch(updateJS(pad.getText()));
            if (i === 3) store.dispatch(updateServer(pad.getText()));
            if (i === 4) store.dispatch(updateDatabase(pad.getText()));
          }
        });
      });
    }
  });
};



ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer} onEnter={onAppEnter}>
        <Route path="/signup" component={SignUp} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);


