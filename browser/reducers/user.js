//const TOGGLE_LOG_IN = 'TOGGLE_LOG_IN';
const RECEIVE_USER_ID = 'RECEIVE_USER_ID';

const initialState = {
 // loggedIn: false,
  userId: '',
};

// reducer
const reducer = (state=initialState, action) => {
  const newState = Object.assign({}, state);
  switch(action.type) {
    // case TOGGLE_LOG_IN:
    //   newState.loggedIn = !state.loggedIn;
    //   return newState;

    case RECEIVE_USER_ID:
      newState.userId = action.userId;
      return newState;

    default:
      return state;
  }
};

// action creators
// export const logIn = () => ({
//   type: TOGGLE_LOG_IN,
// });

export const receiveUserId = (userId) => ({
  type: RECEIVE_USER_ID,
  userId
});

// export const toggleLogIn = () => {
//   return logIn();
// };

export const setUserId = (userId) => {
  return receiveUserId(userId);
};


export default reducer;
