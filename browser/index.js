'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TextEditor from './Containers/TextEditor';
import CSSEditor from './Containers/CSSEditor';
import {Router, Route, hashHistory, IndexRedirect} from 'react-router';
import AppContainer from './Containers/AppContainer';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={AppContainer}>
      <Route path="/html" component={TextEditor} />
      {/*<Route path="/css" component={CSSEditor} />
      <Route path="/javascript" component={TextEditor} />
      <Route path="/server" component={TextEditor} />
      <Route path="/database" component={TextEditor} />*/}
    </Route>
  </Router>,
  document.getElementById('app')
);

