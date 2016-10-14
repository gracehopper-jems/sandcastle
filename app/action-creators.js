export const RECEIVE_PUPPIES = 'RECEIVE_PUPPIES';
export const SELECT_PUPPY = 'SELECT_PUPPY';

const receivePuppies = function (puppies) {
  return {
    type: RECEIVE_PUPPIES,
    receivedPuppies: puppies
  };
};

export const loadPuppies = function () {
  return function (dispatch) {
    fetch('/api/puppies')
      .then(res => res.json())
      .then(puppies => {
        const action = receivePuppies(puppies);
        dispatch(action);
      })
      .catch(err => console.error(err));
  };
};

const selectPuppy = function (puppy) {
  return {
    type: SELECT_PUPPY,
    selectedPuppy: puppy
  };
};

export const loadOnePuppy = function (puppyId) {
  return function (dispatch) {
    fetch('/api/puppies/' + puppyId)
      .then(res => res.json())
      .then(puppy => {
        const action = selectPuppy(puppy);
        const msg = new SpeechSynthesisUtterance(puppy.name);
        window.speechSynthesis.speak(msg);
        dispatch(action);
      })
      .catch(err => console.error(err));
  };
};