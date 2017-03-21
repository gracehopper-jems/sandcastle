'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import HTMLEditor from './Containers/HTMLEditor';
import CSSEditor from './Containers/CSSEditor';
import JSEditor from './Containers/JSEditor';
import ServerEditor from './Containers/ServerEditor';
import DatabaseEditor from './Containers/DatabaseEditor';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import AppContainer from './Containers/AppContainer';
import {apiKey, authDomain, databaseURL} from '../secrets';
import firebase from 'firebase';
import store from './store';
import { Provider } from 'react-redux';
// import { updateCSS } from './reducers/code';
// import { initialize } from './firepads';

const onAppEnter = () => {
  // run init
  var config = {apiKey, authDomain, databaseURL};
  firebase.initializeApp(config);
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
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

// bones boilerplate with auth
// const ExampleApp = connect(
//   ({ auth }) => ({ user: auth })
// ) (
//   ({ user, children }) =>
//     <div>
//       <nav>
//         {user ? <WhoAmI/> : <Login/>}
//       </nav>
//       {children}
//     </div>
// )

// render (
//   <Provider store={store}>
//     <Router history={browserHistory}>
//       <Route path="/" component={ExampleApp}>
//         <IndexRedirect to="/jokes" />
//         <Route path="/jokes" component={Jokes} />
//       </Route>
//     </Router>
//   </Provider>,
//   document.getElementById('main')
// )

