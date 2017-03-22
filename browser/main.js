'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import HTMLEditor from './Containers/HTMLEditor';
import CSSEditor from './Containers/CSSEditor';
import JSEditor from './Containers/JSEditor';
import ServerEditor from './Containers/ServerEditor';
import DatabaseEditor from './Containers/DatabaseEditor';
import SignUp from './Containers/SignUp';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import AppContainer from './Containers/AppContainer';
import {apiKey, authDomain, databaseURL} from '../secrets';
import firebase from 'firebase';
import store from './store';
import {Provider} from 'react-redux';
import { toggleLogIn, setUserId } from './reducers/user';
import makeFirepads from './firepads';
import { updateHTML, updateCSS, updateJS, updateServer, updateDatabase } from './reducers/code';
import makeIframe from './makeIframe';


const onAppEnter = () => {
  // run init
  var config = { apiKey, authDomain, databaseURL };

  firebase.initializeApp(config);

  let user = firebase.auth().currentUser;

  let madeFirepads = false;
  let madeIframe = false;

  firebase.auth().onAuthStateChanged((user) => {
    console.log("USER IN ON APP ENTER", user);
    if (user) {
      let userId = user.uid;
      store.dispatch(setUserId(userId));
    } else {
      store.dispatch(setUserId(''));

    }
    if (madeFirepads === false) {

      let pads = makeFirepads();
      madeFirepads = true;
      pads.forEach((pad, i) => {
        pad.on('ready', () => {
          if (i === 0) store.dispatch(updateHTML(pad.getText()));
          if (i === 1) store.dispatch(updateCSS(pad.getText()));
          if (i === 2) store.dispatch(updateJS(pad.getText()));
          if (i === 3) store.dispatch(updateServer(pad.getText()));
          if (i === 4) store.dispatch(updateDatabase(pad.getText()));
          console.log('STORE', store.getState());
          if (madeIframe === false) {
            makeIframe();
            madeIframe = true;
          }
        });
        pad.on('synced', isSynced => {
          if (isSynced) {
            if (i === 0) store.dispatch(updateHTML(pad.getText()));
            if (i === 1) store.dispatch(updateCSS(pad.getText()));
            if (i === 2) store.dispatch(updateJS(pad.getText()));
            if (i === 3) store.dispatch(updateServer(pad.getText()));
            if (i === 4) store.dispatch(updateDatabase(pad.getText()));
            console.log('STORE', store.getState());
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


