const initialState = {};

// reducer
const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch(action.type) {
    case RECEIVE_CODEMIRROR_INSTANCES:
      return action.codeMirrorInstances;

    default:
      return state;
  }
};

// constants
const RECEIVE_CODEMIRROR_INSTANCES = 'RECEIVE_CODEMIRROR_INSTANCES';

// action creators
export const receiveCodeMirrorInstances = codeMirrorInstances => ({
  type: RECEIVE_CODEMIRROR_INSTANCES,
  codeMirrorInstances
});

export const handleCodeMirrorInstances = (...args) => {
  return receiveCodeMirrorInstances(...args);
};

export default reducer;
