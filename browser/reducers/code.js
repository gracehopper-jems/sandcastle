import axios from 'axios';

const initialState = {
  htmlString: '',
  cssString: '',
  jsString: '',
  serverString: '',
  databaseString: ''
};

// reducer
const reducer = (state=initialState, action) => {
  const newState = Object.assign({}, state);
  switch(action.type) {
    case RECEIVE_HTML:
      newState.htmlString = action.htmlString;
      return newState;

    default:
      return state;
  }
};

// constants
const RECEIVE_HTML = 'RECEIVE_HTML';

// action creators
export const receiveHTML = htmlString => ({
  type: RECEIVE_HTML,
  htmlString
});

export const updateHTML = (htmlString) => {
  return receiveHTML(htmlString);

};

export default reducer;
