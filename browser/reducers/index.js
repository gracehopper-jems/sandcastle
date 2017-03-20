import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  // auth: require('./auth').default,
  code: require('./code').default
});

export default rootReducer;
