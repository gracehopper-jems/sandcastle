import axios from 'axios';

const TOGGLE_LOG_IN = 'TOGGLE_LOG_IN';

const initialState = {
  loggedIn: false,
};

// reducer
const reducer = (state=initialState, action) => {
  const newState = Object.assign({}, state);
  switch(action.type) {
    case TOGGLE_LOG_IN:
      newState.loggedIn = !state.loggedIn;
      return newState;

    default:
      return state;
  }
};

// action creators
export const logIn = () => ({
  type: TOGGLE_LOG_IN,
});

export const toggleLogIn = () => {
  return logIn() 
};


export default reducer;
