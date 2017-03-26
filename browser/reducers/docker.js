const initialState = {
  json: '',
  database: [],
  dockerOn: false,
  port: null
};

// reducer
const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch(action.type) {
    case RECEIVE_JSON:
      newState.json = action.json;
      return newState;

    case POST_TO_DB:
      newState.database = newState.database.concat(action.post);
      return newState;

    case UPDATE_DOCKER:
      newState.dockerOn = action.bool;
      return newState;

    case RECEIVE_PORT:
      newState.port = action.port;
      return newState;

    default:
      return state;
  }
};

// constants
const RECEIVE_JSON = 'RECEIVE_JSON';
const POST_TO_DB = 'POST_TO_DB';
const UPDATE_DOCKER = 'UPDATE_DOCKER';
const RECEIVE_PORT = 'RECEIVE_PORT';

// action creators
export const receiveJson = json => ({
  type: RECEIVE_JSON,
  json
});

export const sendJson = (...args) => {
  return receiveJson(...args);
};

export const postToDB = post => ({
  type: POST_TO_DB,
  post
});

export const sendPost = (...args) => {
  return postToDB(...args);
};

export const updateDockerOn = bool => ({
  type: UPDATE_DOCKER,
  bool
});

export const sendUpdateDockerOn = (...args) => {
  return updateDockerOn(...args);
};

export const receivePort = port => ({
  type: RECEIVE_PORT,
  port
});

export const sendPort = (...args) => {
  return receivePort(...args);
};

export default reducer;
