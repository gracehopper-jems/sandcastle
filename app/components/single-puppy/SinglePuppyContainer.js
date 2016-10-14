import { connect } from 'react-redux';
import SinglePuppy from './SinglePuppy';
import { loadOnePuppy } from '../../action-creators';

const mapStateToProps = function (state) {
  return {
    puppy: state.selectedPuppy
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  return {
    onLoadSinglePuppy: function () {
      const puppyId = ownProps.params.puppyId;
      const thunk = loadOnePuppy(puppyId);
      dispatch(thunk);
    }
  };
};

const componentCreator = connect(mapStateToProps, mapDispatchToProps);
const SinglePuppyContainer = componentCreator(SinglePuppy);
export default SinglePuppyContainer;
