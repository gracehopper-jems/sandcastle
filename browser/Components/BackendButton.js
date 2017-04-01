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
      const userServerPort = res.data.port;
      this.props.handlers.handleSendPort(userServerPort);
      this.props.handlers.handleUpdateDockerOn(true);
      this.setState({isLoading: false});
    })
    .catch(console.error);
  }

  render(){
    const isLoading = this.state.isLoading;
    return (
      <div
        disabled={isLoading}
        onClick={!isLoading ? this.handleClick: null}>
        {isLoading ? <ProgressModal view={'Backend'}/> : 'Run Full App'}
      </div>
    )
  }
}

export default BackendButton;



