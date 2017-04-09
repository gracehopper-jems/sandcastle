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
import firebase from 'firebase';
import store from './store';
import { setUserId } from './reducers/user';
import makeFirepads from './utils/firepads';
import * as updateActions from './reducers/code';
import makeFrontendIframe from './utils/makeFrontendIframe';
import { updateHTML, updateCSS, updateJS, updateServer, updateDatabase, updateAllCode } from './reducers/code'
const apiKey = require('../variables').apiKey;
const authDomain = require('../variables').authDomain;
const databaseURL = require('../variables').databaseURL;

injectTapEventPlugin(); //need this for the progress indicator

let pads = [];

var textFromLocalDB = false; // this variable determines whether or not we are fetching our text from our own database (as opposed to Firebase) - we would only be fetching from our local database if someone had either clicked on one of their saved projects, or had entered in a link to a shared project in their URL bar
if (location.pathname.startsWith('/share'))  {
// Check to see if any route begins with ‘share’ 
    textFromLocalDB = true; // this means we ARE fetching text from our own database 
    const hashedId = location.pathname.slice(location.pathname.indexOf('/share')+6);
    // If so, take the hashed ID of the project (which is whatever string is after the word share) 
    axios.get(`/api/project/${hashedId}`)
    // and fetch the data attached with that hashed ID using an axios request. 
    .then(res => {
        return res.data
    })
    .then(data => {
        return data.code
    })
    .then(code => {
        return JSON.parse(code);
    })
    .then(sharedCode => {
        // and then set the fetched data to state 
        store.dispatch(updateAllCode(sharedCode));
    })
    .then(browserHistory.push('/'))
    .catch(console.error)
}

const onAppEnter = () => {
    var config = {apiKey, authDomain, databaseURL};
    firebase.initializeApp(config);

    let madeFirepads = false;

    firebase.auth().onAuthStateChanged((user) => {

        if (user) {
            let userId = user.uid;
            store.dispatch(setUserId(userId));

            axios.post('/setUser', {userId: userId})
            .catch(console.error);

            // if user is logged in add an event listener to window to check if user is leaving page
            // send get request to server to remove container if container is running
            window.addEventListener("beforeunload", function (e) {
                e.preventDefault();

                axios.get('/removeContainer')
                .then((res) => {
                    console.log('removing container');
                })
                .catch(console.error);
            });

        // render firepads
        if (madeFirepads === false) {
            let firepads = makeFirepads();
            let allFirepads = firepads[0];
            let orderManifesto = ['HTML', 'CSS', 'JS', 'Server', 'Database'];
            let stateOrderManifesto = ['htmlString', 'cssString', 'jsString', 'serverString', 'databaseString'];

            madeFirepads = true;

            // creating firepads and updating state with text
            Promise.map(allFirepads, (pad, i) => {
                return new Promise((resolve, reject) => {
                    pad.on('ready', () => {
                        pads.push(pad);
                        if (!textFromLocalDB){ // if we aren't fetching our text from our local database, use Firepad's getText method to fetch text from Firebase 
                            store.dispatch(updateActions[`update${orderManifesto[i]}`](pad.getText()));
                            resolve();
                        } else { // if we are fetching our text from our local database, then we need to fetch the code that we saved on state during our axios request, and use Firepad's setText method to update each pad
                            let appState = store.getState();
                            let appCode = appState.code;
                            pad.setText(appCode[stateOrderManifesto[i]]);
                            textFromLocalDB = false;
                            resolve()
                            window.location.reload(); // For whatever reason, it doesn't properly work without reloading the page
                        }
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
