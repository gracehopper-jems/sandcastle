import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  // auth: require('./auth').default,
  code: require('./code').default,
  user: require('./user').default,
  codemirror: require('./codemirror').default
});

export default rootReducer;
