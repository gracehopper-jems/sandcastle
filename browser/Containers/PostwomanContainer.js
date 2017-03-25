import React, {Component} from 'react';
import { FormGroup, InputGroup, FormControl, DropdownButton, MenuItem, Button } from 'react-bootstrap'
import axios from 'axios';

export default class PostwomanContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            path: '/',
            requestType: 'GET'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.handleRequestType = this.handleRequestType.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        let path = event.target.value;
        if (path[0] !== '/') {
            path = '/' + path;
        }
        this.setState({path: path});
    }

    handleSend(event) {
        event.preventDefault();

        if (this.state.requestType === 'GET' && this.state.path !== '') {
            axios.post('/postWomanGetPath', {path: this.state.path})
            .then((res) => {
                console.log('========response', res);
            })
            .then(() => {
                return axios.get('/containerGet');       
            })
            .then((res) => {  
                console.log('response from backend', res.data);
                return JSON.stringify(res.data);
            })
            .then((jsonStr) => {
                console.log('about to dispatch to store', jsonStr);
                this.props.handlers.handleSendJson(jsonStr);
            })
            .catch(console.error);
        } else if (this.state.requestType === 'POST' && this.state.path !== '') {
            axios.post('/postWomanGetPath', {path: this.state.path})
            .then((res) => {
                console.log('========response', res);
            })
            .then(() => {
                return axios.get('/containerPostTest')    
            })
            .then((res) => {
                return JSON.stringify(res.data);
            })
            .then((jsonStr) => {
                console.log('response from backend', jsonStr);
                console.log('about to dispatch POST REQUEST to store', jsonStr);
                this.props.handlers.handleSendPost(jsonStr);
            })
            .then(() => {
                this.props.handlers.handleSendJson("Congrats! You made a post! You can now checkout out your database.")
            })
            .catch(console.error);
        }
    }

    handleRequestType(event) {
        console.log('event', event)
        event.preventDefault();
        this.setState({requestType: event.target.value})
    }

    render(){
        console.log('props', this.props)
        return (
            <div>
                <select className="custom-select" onChange={this.handleRequestType}>
                    <option>GET</option>
                    <option>POST</option>
                </select>
                <FormGroup>
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
