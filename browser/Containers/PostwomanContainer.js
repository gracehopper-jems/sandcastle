import React, {Component} from 'react';
import { FormGroup, InputGroup, FormControl, DropdownButton, MenuItem, Button, ControlLabel } from 'react-bootstrap'
import axios from 'axios';
import Promise from 'bluebird';

export default class PostwomanContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            path: '/',
            requestType: 'GET',
            requestBody: '{"example_key": "example_value"}',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.handleRequestType = this.handleRequestType.bind(this);
        this.handleRequestBody = this.handleRequestBody.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        let path = event.target.value;
        if (path[0] !== '/') {
            path = '/' + path;
        }
        this.setState({path: path});
    }

    handleRequestBody(event) {
        event.preventDefault();
        let requestBody = event.target.value;
        this.setState({requestBody: requestBody})
    }

    handleSend(event) {
        event.preventDefault();

        axios.post('/postWomanPath', {path: this.state.path})
        .then(() => {
            var axiosPromise;
            if (this.state.requestType === 'GET' && this.state.path !== ''){
                axiosPromise = axios.get('/containerAPI');
            } else if (this.state.requestType === 'POST' && this.state.path !== ''){
                axiosPromise = axios.post('/containerAPI', {request: this.state.requestBody});
            }  else if (this.state.requestType === 'PUT' && this.state.path !== '') {
                axiosPromise = axios.put('/containerAPI', {request: this.state.requestBody});
            } else if (this.state.requestType === 'DELETE' && this.state.path !== '') {
                axiosPromise = axios.delete('/containerAPI', {request: this.state.requestBody});
            }
            return axiosPromise;
        })
        .then((res) => {
            // return JSON
            return JSON.stringify(res.data);
        })
        .then((jsonStr) => {

            if (this.state.requestType === 'POST'){
                this.props.handlers.handleSendPost(jsonStr);
            } else if (this.state.requestType === 'PUT'){
                this.props.handlers.handleSendPut(jsonStr);
            } else if (this.state.requestType === 'DELETE'){
                this.props.handlers.handleSendDelete(jsonStr);
            }
            // dispatches below makes sure iframe for app refreshes
            this.props.handlers.handleUpdateDockerOn(false);
            this.props.handlers.handleUpdateDockerOn(true);
            return jsonStr
        })
        .then((jsonStr) => {
            // add JSON to redux state
            this.props.handlers.handleSendJson(jsonStr);
        })
        .catch(console.error);
    }

    handleRequestType(event) {
        event.preventDefault();
        // when user chooses a different request method, the old server view is cleared from view
        this.props.handlers.handleSendJson('');
        this.setState({requestType: event.target.value});
    }

    render(){
        return (
            <div>
                <br/>
                <FormGroup controlId="formControlsSelect">
                    <FormControl componentClass="select" placeholder="select" className="selectdropdown" onChange={this.handleRequestType}>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                {this.state.requestType === 'POST' || this.state.requestType === 'PUT' ?

                ( <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Enter request body as JSON:</ControlLabel>
                        <FormControl componentClass="textarea"value={this.state.requestBody} onChange={this.handleRequestBody} />
                    </FormGroup>)
                : null
                }
                    <ControlLabel>Enter route:</ControlLabel>
                    <InputGroup>
                        <FormControl id={"route-form"} type="text" value={this.state.path} onChange={this.handleChange} />
                        <InputGroup.Button>
                            {this.props.docker.dockerOn ?
                                <Button onClick={this.handleSend}>Send</Button>
                                :
                                <Button disabled>Send</Button>
                            }
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </div>
        )
    }
}
