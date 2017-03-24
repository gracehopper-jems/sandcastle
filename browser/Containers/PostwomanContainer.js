import React, {Component} from 'react';
import { FormGroup, InputGroup, FormControl, DropdownButton, MenuItem, Button } from 'react-bootstrap'
import axios from 'axios';

export default class PostwomanContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            path: '/'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSend = this.handleSend.bind(this);
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

        axios.post('/postWomanGetPath', {path: this.state.path})
        .then(() => {

        })
        .catch(console.error);
    }

    render(){
        console.log('state', this.state)
        return (
            <div>
                <FormGroup>
                    <InputGroup>
                        <DropdownButton
                        componentClass={InputGroup.Button}
                        id="input-dropdown-addon"
                        title="Action"
                        >
                        <MenuItem key="1">POST</MenuItem>
                        <MenuItem key="2">PUT</MenuItem>
                        </DropdownButton>
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
