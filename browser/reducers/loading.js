//const
const SET_LOADING_STATE = 'SET_LOADING_STATE';

const initialState = {
  loadingState: false
};

// reducer
const reducer = (state=initialState, action) => {
  const newState = Object.assign({}, state);
  switch(action.type) {

    case SET_LOADING_STATE:
      newState.loadingState = true;
      return newState;

    default:
      return state;
  }
};

//action creators
export const setLoadingState = () => ({
  type: SET_LOADING_STATE,
});

export const updateLoadingState = () => {
  return setLoadingState();
};

export default reducer;
