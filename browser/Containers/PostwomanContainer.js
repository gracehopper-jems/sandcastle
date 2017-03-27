import React, {Component} from 'react';
import { FormGroup, InputGroup, FormControl, DropdownButton, MenuItem, Button, ControlLabel } from 'react-bootstrap'
import axios from 'axios';

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
        let requestBody = event.target.value;
        event.preventDefault();
        this.setState({requestBody: requestBody})
    }

    handleSend(event) {
        event.preventDefault();
        if (this.state.requestType === 'GET' && this.state.path !== '') {
            axios.post('/postWomanGetPath', {path: this.state.path})
            .then(() => {
                return axios.get('/containerGet');
            })
            .then((res) => {
                return JSON.stringify(res.data);
            })
            .then((jsonStr) => {
                this.props.handlers.handleSendJson(jsonStr);
            })
            .catch(console.error);
        } else if (this.state.requestType === 'POST' && this.state.path !== '') {
            axios.post('/postWomanGetPath', {path: this.state.path})
            .then(() => {
                return axios.post('/containerPostTest', {request: this.state.requestBody} )
            })
            .then((res) => {
                return JSON.stringify(res.data);
            })
            .then((jsonStr) => {
                this.props.handlers.handleSendPost(jsonStr);

                // dispatches below makes sure iframe for app refreshes
                this.props.handlers.handleUpdateDockerOn(false);
                this.props.handlers.handleUpdateDockerOn(true);

                return jsonStr;
            })
            .then((jsonStr) => {
                this.props.handlers.handleSendJson(jsonStr);
            })
            .catch(console.error);
        } else if (this.state.requestType === 'DELETE' && this.state.path !== '') {
            axios.post('/postWomanGetPath', {path: this.state.path})
            .then(() => {
                return axios.delete('/containerDeleteTest', {request: this.state.requestBody} )
            })
            .then((res) => {
                console.log("RESPONSE FROM DELETE REQUEST")
                console.log(res); 
                return JSON.stringify(res.data);
            })
            .then((jsonStr) => {
                console.log("AS A JSON STR", jsonStr); 
                this.props.handlers.handleSendDelete(jsonStr);

                // dispatches below makes sure iframe for app refreshes
                this.props.handlers.handleUpdateDockerOn(false);
                this.props.handlers.handleUpdateDockerOn(true);

                return jsonStr;
            })
            .then((jsonStr) => {
                this.props.handlers.handleSendJson(jsonStr);
            })
            .catch(console.error);
        }



    }

    handleRequestType(event) {
        event.preventDefault();
        // when user chooses a different request method, the old server view is cleared from view
        this.props.handlers.handleSendJson('');
        this.setState({requestType: event.target.value});
    }

    render(){
        console.log("REQUEST TYPE", this.state.requestType); 
        return (
            <div>
                {/*<select className="custom-select" onChange={this.handleRequestType}>
                    <option>GET</option>
                    <option>POST</option>
                </select>*/}
                <FormGroup controlId="formControlsSelect">
                    <FormControl componentClass="select" placeholder="select" className="selectdropdown" onChange={this.handleRequestType}>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="DELETE">DELETE</option>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                {this.state.requestType === 'POST' ?

                ( <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Enter request body as JSON:</ControlLabel>
                        <FormControl componentClass="textarea"value={this.state.requestBody} onChange={this.handleRequestBody} />
                    </FormGroup>)
                : null
                }
                    <ControlLabel>Enter route:</ControlLabel>
                    <InputGroup>
                        <FormControl type="text" value={this.state.path} onChange={this.handleChange} />
                        <InputGroup.Button>
                            <Button onClick={this.handleSend}>Send</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>
            </div>
        )
    }
}
