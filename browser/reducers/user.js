//const
const RECEIVE_USER_ID = 'RECEIVE_USER_ID';

const initialState = {
  userId: '',
};

// reducer
const reducer = (state=initialState, action) => {
  const newState = Object.assign({}, state);
  switch(action.type) {

    case RECEIVE_USER_ID:
      newState.userId = action.userId;
      return newState;

    default:
      return state;
  }
};

//action creators
export const receiveUserId = (userId) => ({
  type: RECEIVE_USER_ID,
  userId
});

export const setUserId = (userId) => {
  return receiveUserId(userId);
};

export default reducer;
