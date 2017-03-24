import React, {Component} from 'react';
import axios from 'axios';

class BackendButton extends Component {

  constructor(props) {
    super(props); 

    this.state = {
      isLoading: false
    }; 

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event) {
    event.preventDefault();
    this.setState({isLoading: true}); 

    axios.post('/container', {userRoutes: this.props.code.serverString, userModels: this.props.code.databaseString})
    .then(() => {
      console.log('running container');
    })
    .catch(console.error);

    setTimeout(() => {
        // Completed of async action, set loading state back
        this.setState({isLoading: false});
      }, 5000);
  }

  render(){
    let isLoading = this.state.isLoading;
    return (
      <div 
        disabled={isLoading}
        onClick={!isLoading? this.handleClick: null}>
        {isLoading ? 'Running your backend...' : 'Run Backend'}
      </div> 
    )
}

}


export default BackendButton;



