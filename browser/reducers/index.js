import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    code: require('./code').default,
    user: require('./user').default,
    docker: require('./docker').default,
    loading: require('./loading').default
});

export default rootReducer;
