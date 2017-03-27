const initialState = {
  json: '',
  database: [],
  dockerOn: false,
  port: null
};

// reducer
const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);
  console.log('ACTION', action);

  switch(action.type) {
    case RECEIVE_JSON:
      if (action.json.includes('Error') && action.json.includes('Cannot GET')) {
        newState.json = 'Error: Cannot GET';
      } else if (action.json.includes('Error') && action.json.includes('Cannot POST')) {
        newState.json = 'Error: Cannot POST';
      } else {
        newState.json = action.json;
      }
      return newState;

    case POST_PUT_DELETE_DB:
      newState.database = newState.database.concat(action.postPutDelete);
      return newState;


    case CLEAR_DB:
      newState.database = [];
      return newState;

    case UPDATE_DOCKER:
      newState.dockerOn = action.bool;
      return newState;

    case RECEIVE_PORT:
      newState.port = action.port;
      return newState;

    // case PUT_TO_DB:
    //   newState.database = newState.database.concat(action.put);
    //   return newState;

    // case DELETE_FROM_DB:
    //   return action.del;

    default:
      return state;
  }
};

// constants
const RECEIVE_JSON = 'RECEIVE_JSON';
const POST_PUT_DELETE_DB = 'POST_PUT_DELETE_DB';
// const PUT_TO_DB = 'PUT_TO_DB';
// const DELETE_FROM_DB = 'DELETE_FROM_DB';
const UPDATE_DOCKER = 'UPDATE_DOCKER';
const RECEIVE_PORT = 'RECEIVE_PORT';
const CLEAR_DB = 'CLEAR_DB';

// action creators
export const receiveJson = json => ({
  type: RECEIVE_JSON,
  json
});

export const sendJson = (...args) => {
  return receiveJson(...args);
};

export const postPutDeleteDB = postPutDelete => ({
  type: POST_PUT_DELETE_DB,
  postPutDelete
});

export const sendPostPutDelete = (...args) => {
  console.log('HI FROM DOCKER.JS');
  return postPutDeleteDB(...args);
};

<<<<<<< HEAD
export const clearDB = () => ({
  type: CLEAR_DB
});

export const sendClearDB = () => {
  return clearDB();
};
=======
// PUT-AND-DELETE
// export const putToDb = put => ({
//   type: PUT_TO_DB,
//   put
// });

// export const sendPut = (...args) => {
//   return putToDb(...args);
// };

// export const deleteFromDb = del => ({
//   type: DELETE_FROM_DB,
//   del
// });

// export const sendDelete = (...args) => {
//   console.log('HI');
//   return deleteFromDb(...args);
// }
>>>>>>> 130c454872425c1524f1df0b86537510c85968cc

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
