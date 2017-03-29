//const
const SET_LOADING_STATE = 'SET_LOADING_STATE';
const SET_TIME_FOR_TOUR_TRUE = 'SET_TIME_FOR_TOUR_TRUE';

const initialState = {
  loadingState: false,
  timeForTour: false,
};

// reducer
const reducer = (state=initialState, action) => {
  const newState = Object.assign({}, state);
  switch(action.type) {

    case SET_LOADING_STATE:
      newState.loadingState = true;
      return newState;

    case SET_TIME_FOR_TOUR_TRUE:
      newState.timeForTour = true;
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

export const updateTimeForTourTrue = () => {
  return setTimeForTourTrue();
};

export const setTimeForTourTrue = () => ({
  type: SET_TIME_FOR_TOUR_TRUE,
})

export default reducer;
