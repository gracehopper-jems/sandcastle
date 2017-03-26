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
            })
            .then(() => {
                this.props.handlers.handleSendJson("Congrats! You made a post! You can now checkout out your database.")
            })
            .catch(console.error);
        }
    }

    handleRequestType(event) {
        event.preventDefault();
        this.setState({requestType: event.target.value})
    }

    render(){
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
                    </FormControl>
                    </FormGroup>
                <FormGroup>
                {this.state.requestType === 'POST' ?

                (<div>
                    <p>Enter POST request body here:</p>

                        <InputGroup>
                            <FormControl type="text" value={this.state.requestBody} onChange={this.handleRequestBody} />
                        </InputGroup>
                </div>)
                : null
                }
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
