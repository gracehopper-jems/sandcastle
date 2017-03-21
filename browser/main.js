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
import {toggleLogIn, setUserId} from './reducers/user';

const onAppEnter = () => {
  // run init
  var config = {apiKey, authDomain, databaseURL};
  firebase.initializeApp(config);

  let user = firebase.auth().currentUser;

  firebase.auth().onAuthStateChanged((user) => {
    console.log("USER IN ON APP ENTER", user);
    if (user){
      let userId = user.uid;
      store.dispatch(setUserId(userId));
    } else {
      store.dispatch(setUserId(''));
    }
  })
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer} onEnter={onAppEnter}>
        <Route path="/html" component={HTMLEditor} />
        <Route path="/css" component={CSSEditor} />
        <Route path="/javascript" component={JSEditor} />
        <Route path="/server" component={ServerEditor} />
        <Route path="/database" component={DatabaseEditor} />
        <Route path="/signup" component={SignUp} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);


