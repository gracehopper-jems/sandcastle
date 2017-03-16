'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TextEditor from './TextEditor';
import {Router, Route, hashHistory, IndexRedirect} from 'react-router';


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={AppContainer}>
      <Route path="/html" component={htmlContainer} />
      <Route path="/css" component={cssContainer} />
      <Route path="/javascript" component={javascriptContainer} />
      <Route path="/express" component={expressContainer} />
      <Route path="/sequelize" component={sequelizeContainer} />
    </Route>
  </Router>,
  document.getElementById('app')
);

