import { combineReducers } from 'redux';
import { RECEIVE_PUPPIES, SELECT_PUPPY } from './action-creators';

function allPuppiesReducer (state = [], action) {
  switch (action.type) {
    case RECEIVE_PUPPIES: return action.receivedPuppies;
    default: return state;
  }
}

function selectedPuppyReducer (state = {}, action) {
  switch (action.type) {
    case SELECT_PUPPY: return action.selectedPuppy;
    default: return state;
  }
}

const rootReducer = combineReducers({
  allPuppies: allPuppiesReducer,
  selectedPuppy: selectedPuppyReducer
});

export default rootReducer;