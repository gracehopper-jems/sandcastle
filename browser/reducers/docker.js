const initialState = {json: ''};

// reducer
const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch(action.type) {
    case RECEIVE_JSON:
      newState.json = action.json;
      return newState;

    default:
      return state;
  }
};

// constants
const RECEIVE_JSON = 'RECEIVE_JSON';

// action creators
export const receiveJson = json => ({
  type: RECEIVE_JSON,
  json
});


export const sendJson = (...args) => {
  return receiveJson(...args);
};

export default reducer;
