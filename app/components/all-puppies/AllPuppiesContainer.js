import { connect } from 'react-redux';
import { loadPuppies } from '../../action-creators';
import AllPuppies from './AllPuppies';

const mapStateToProps = function (state) {
  return {
    puppies: state.allPuppies
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    onLoadPuppies: function () {
      const thunk = loadPuppies();
      dispatch(thunk);
    }
  };
};

const componentCreator = connect(mapStateToProps, mapDispatchToProps);
const AllPuppiesContainer = componentCreator(AllPuppies);
export default AllPuppiesContainer;
