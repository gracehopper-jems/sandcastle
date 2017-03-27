import React, {Component} from 'react';
import axios from 'axios';
import Progress, { ProgressModal } from '../Components/ProgressIndicator'

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

    // old server and database views cleared from view
    this.props.handlers.handleSendJson('');
    this.props.handlers.handleSendClearDB();

    this.setState({isLoading: true});
    axios.post('/container', {userRoutes: this.props.code.serverString,
      userModels: this.props.code.databaseString,
      userHTML: this.props.code.htmlString,
      userCSS: this.props.code.cssString,
      userJS: this.props.code.jsString
    })
    .then((res) => {
      console.log('running container');
      const userServerPort = res.data.port;


      // ========= change this once we figure out to send signal that docker composed up and port is listening
      setTimeout(() => {
        this.props.handlers.handleSendPort(userServerPort);
        this.props.handlers.handleUpdateDockerOn(true);
      }, 30000);
    })
    .catch(console.error);

    // ========= change this once we figure out to send signal that docker composed up and port is listening
    setTimeout(() => {
        // Completed of async action, set loading state back
        this.setState({isLoading: false});
    }, 30000);
  }

  render(){
    const isLoading = this.state.isLoading;
    return (
      <div
        disabled={isLoading}
        onClick={!isLoading ? this.handleClick: null}>
        {isLoading ? <ProgressModal /> : 'Run Backend'}
      </div>
    )
  }
}

export default BackendButton;



