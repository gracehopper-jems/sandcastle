'use strict';

import ReactDOM from 'react-dom';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import firebase from 'firebase';

import WritePage from './Firepad';
import config from '../firebaseInfo';





// const store = createStore(reducers, {}, applyMiddleware(thunkMiddleware));


class App extends Component {

	componentWillMount() {
		firebase.initializeApp(config);
	}

	render() {
    return (
        <div className="container flexbox-container">
            <WritePage />
        </div>
		);
	}
}

export default App;

ReactDOM.render(
    <App />,
  document.getElementById('app')
);
