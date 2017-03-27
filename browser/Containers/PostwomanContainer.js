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
        this.setState({ requestBody: requestBody });
    }

    handleSend(event) {
        event.preventDefault();
<<<<<<< HEAD
=======
        console.log('REQUEST TYPE', this.state.requestType);

>>>>>>> 130c454872425c1524f1df0b86537510c85968cc
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
        } else if ((this.state.requestType === 'POST' || this.state.requestType === 'PUT' || this.state.requestType === 'DELETE') && this.state.path !== '') {
            axios.post('/postWomanGetPath', {path: this.state.path})
            .then(() => {
                return axios.post('/containerPostPutDeleteTest', { requestType: this.state.requestType, request: this.state.requestBody });
            })
            .then((res) => {
                return JSON.stringify(res.data);
            })
            .then((jsonStr) => {
                this.props.handlers.handleSendPostPutDelete(jsonStr);

                // dispatches below makes sure iframe for app refreshes
                this.props.handlers.handleUpdateDockerOn(false);
                this.props.handlers.handleUpdateDockerOn(true);

                return jsonStr;
            })
<<<<<<< HEAD
            .then((jsonStr) => {
                this.props.handlers.handleSendJson(jsonStr);
=======
            .then(() => {
                this.props.handlers.handleSendJson("Congrats! You've updated your database! You can now check it out.");
>>>>>>> 130c454872425c1524f1df0b86537510c85968cc
            })
                .catch(console.error);
// PUT-AND-DELETE
        // } else if (this.state.requestType === 'PUT' && this.state.path !== '') {
            // axios.post('/postWomanGetPath', { path: this.state.path })
            //     .then(() => {
            //         return axios.put('/containerPutTest', { request: this.state.requestBody });
            //     })
            //     .then((res) => {
            //         return JSON.stringify(res.data);
            //     })
            //     .then((jsonStr) => {
            //         console.log(this.state.requestType);
            //         this.props.handlers.handleSendPut(jsonStr);
            //         this.props.handlers.handleUpdateDockerOn(false);
            //         this.props.handlers.handleUpdateDockerOn(true);
            //     })
            //     .then(() => {
            //         this.props.handlers.handleSendJson('Congrats! You\'ve made a PUT!')
            //     })
            //     .catch(console.error);
        // } else if (this.state.requestType === 'DELETE' && this.state.path !== '') {
        //     axios.post('/postWomanGetPath', { path: this.state.path })
        //         .then(() => {
        //             console.log('HELLO FROM POSTWOMAN CONTAINER');
        //             return axios.delete('/containerDeleteTest');
        //         })
        //         .then(() => {
        //             this.props.handlers.handleSendDelete('Your DELETE was successful');
        //         })
        //         .catch(console.error);
        }
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
                {/*<select className="custom-select" onChange={this.handleRequestType}>
                    <option>GET</option>
                    <option>POST</option>
                </select>*/}
                <FormGroup controlId="formControlsSelect">
                    <FormControl componentClass="select" placeholder="select" className="selectdropdown" onChange={this.handleRequestType}>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                {this.state.requestType === 'POST' || this.state.requestType === 'PUT' || this.state.requestType === 'DELETE' ?

<<<<<<< HEAD
                ( <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Enter request body as JSON:</ControlLabel>
                        <FormControl componentClass="textarea"value={this.state.requestBody} onChange={this.handleRequestBody} />
                    </FormGroup>)
=======
                (<div>
                    <p>Enter {this.state.requestType} request body here:</p>
                        <InputGroup>
                            <FormControl type="text" value={this.state.requestBody} onChange={this.handleRequestBody} />
                        </InputGroup>
                </div>)
>>>>>>> 130c454872425c1524f1df0b86537510c85968cc
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
