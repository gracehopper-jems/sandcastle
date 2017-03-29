//const
const SET_LOADING_STATE = 'SET_LOADING_STATE';
const SET_TIME_FOR_TOUR_TRUE = 'SET_TIME_FOR_TOUR_TRUE';
const SET_TIME_FOR_TOUR_FALSE = 'SET_TIME_FOR_TOUR_FALSE';
const SET_RENDER_MODAL_TRUE = 'SET_RENDER_MODAL_TRUE';
const SET_RENDER_MODAL_FALSE = 'SET_RENDER_MODAL_FALSE';

const initialState = {
  loadingState: false,
  timeForTour: false,
  renderModal: false,
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

    case SET_TIME_FOR_TOUR_FALSE:
      newState.timeForTour = false;
      return newState;

    case SET_RENDER_MODAL_TRUE:
      newState.renderModal = true;
      return newState;

    case SET_RENDER_MODAL_FALSE:
      newState.renderModal = false;
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

// set timeForTour to true
export const updateTimeForTourTrue = () => {
  return setTimeForTourTrue();
};

export const setTimeForTourTrue = () => ({
  type: SET_TIME_FOR_TOUR_TRUE,
});

// set timeForTour to false
export const updateTimeForTourFalse = () => {
  return setTimeForTourFalse();
};

export const setTimeForTourFalse = () => ({
  type: SET_TIME_FOR_TOUR_FALSE,
});

export const updateRenderModalTrue = () => {
  return setRenderModalTrue();
}

export const setRenderModalTrue = () => ({
  type: SET_RENDER_MODAL_TRUE,
});

export const updateRenderModalFalse = () => {
  return setRenderModalFalse();
}

export const setRenderModalFalse = () => ({
  type: SET_RENDER_MODAL_FALSE,
});

export default reducer;
