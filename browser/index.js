'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TextEditor from './Containers/TextEditor';
import CSSEditor from './Containers/CSSEditor';
import JSEditor from './Containers/JSEditor';
import ServerEditor from './Containers/ServerEditor';
import DatabaseEditor from './Containers/DatabaseEditor';
import {Router, Route, hashHistory, IndexRedirect} from 'react-router';
import AppContainer from './Containers/AppContainer';
import {apiKey, authDomain, databaseURL} from '../secrets';
import firebase from 'firebase';

function init() {
  var config = {
      apiKey,
      authDomain,
      databaseURL
    };
    firebase.initializeApp(config);
}
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/"
      component={AppContainer}
      onEnter={() => {
        init()
      }}
      >
      <Route path="/html" component={TextEditor} />
      <Route path="/css" component={CSSEditor} />
      <Route path="/javascript" component={JSEditor} />
      <Route path="/server" component={ServerEditor} />
      <Route path="/database" component={DatabaseEditor} />
    </Route>
  </Router>,
  document.getElementById('app')
);

