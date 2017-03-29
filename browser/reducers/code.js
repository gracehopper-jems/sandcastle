const initialState = {
  htmlString: '',
  cssString: '',
  jsString: '',
  serverString: '',
  databaseString: '',
  currentProject: '',
};

// reducer
const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch(action.type) {
    case RECEIVE_HTML:
      newState.htmlString = action.htmlString;
      return newState;

    case RECEIVE_CSS:
      newState.cssString = action.cssString;
      return newState;

    case RECEIVE_JS:
      newState.jsString = action.jsString;
      return newState;

    case RECEIVE_SERVER:
      newState.serverString = action.serverString;
      return newState;

    case RECEIVE_DATABASE:
      newState.databaseString = action.databaseString;
      return newState;

    case RECEIVE_CURRENT_PROJECT:
      newState.currentProject = action.currentProject;
      return newState;

    case RECEIVE_ALL_CODE:
      newState.htmlString = action.code.htmlString;
      newState.cssString = action.code.cssString;
      newState.jsString = action.code.jsString;
      newState.serverString = action.code.serverString;
      newState.databaseString = action.code.databaseString;
      return newState;

    default:
      return state;
  }
};

// constants
const RECEIVE_HTML = 'RECEIVE_HTML';
const RECEIVE_CSS = 'RECEIVE_CSS';
const RECEIVE_JS = 'RECEIVE_JS';
const RECEIVE_SERVER = 'RECEIVE_SERVER';
const RECEIVE_DATABASE = 'RECEIVE_DATABASE';
const RECEIVE_CURRENT_PROJECT = 'RECEIVE_CURRENT_PROJECT';
const RECEIVE_ALL_CODE = 'RECEIVE_ALL_CODE';

// action creators
export const receiveHTML = htmlString => ({
  type: RECEIVE_HTML,
  htmlString
});

export const receiveCSS = cssString => ({
  type: RECEIVE_CSS,
  cssString
});

export const receiveJS = jsString => ({
  type: RECEIVE_JS,
  jsString
});

export const receiveServer = serverString => ({
  type: RECEIVE_SERVER,
  serverString
});

export const receiveDatabase = databaseString => ({
  type: RECEIVE_DATABASE,
  databaseString
});

export const receiveCurrentProject = currentProject => ({
  type: RECEIVE_CURRENT_PROJECT,
  currentProject
});

export const receiveAllCode = code => ({
  type: RECEIVE_ALL_CODE,
  code
});




export const updateHTML = (...args) => {
  return receiveHTML(...args);
};

export const updateCSS = (...args) => {
  return receiveCSS(...args);
};

export const updateJS = (...args) => {
  return receiveJS(...args);
};

export const updateServer = (...args) => {
  return receiveServer(...args);
};

export const updateDatabase = (...args) => {
  return receiveDatabase(...args);
};

export const updateCurrentProject = (...args)  => {
  return receiveCurrentProject(...args);
}

export const updateAllCode = (...args) => {
  return receiveAllCode(...args);
};

export default reducer;
