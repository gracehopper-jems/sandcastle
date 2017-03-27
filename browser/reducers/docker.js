const initialState = {
  json: '',
  database: [],
};

// reducer
const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);
  console.log('ACTION', action);

  switch(action.type) {
    case RECEIVE_JSON:
      newState.json = action.json;
      return newState;

    case POST_TO_DB:
      newState.database = newState.database.concat(action.post);
      return newState;

    case PUT_TO_DB:
      newState.database = newState.database.concat(action.put);
      return newState;

    case DELETE_FROM_DB:
      return action.del;

    default:
      return state;
  }
};

// constants
const RECEIVE_JSON = 'RECEIVE_JSON';
const POST_TO_DB = 'POST_TO_DB';
const PUT_TO_DB = 'PUT_TO_DB';
const DELETE_FROM_DB = 'DELETE_FROM_DB';

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

// PUT-AND-DELETE
export const putToDb = put => ({
  type: PUT_TO_DB,
  put
});

export const sendPut = (...args) => {
  return putToDb(...args);
};

export const deleteFromDb = del => ({
  type: DELETE_FROM_DB,
  del
});

export const sendDelete = (...args) => {
  console.log('HI');
  return deleteFromDb(...args);
}

export default reducer;
