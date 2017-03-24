import React, {Component} from 'react';
import { FormGroup, InputGroup, FormControl, DropdownButton, MenuItem, Button } from 'react-bootstrap'

export default class PostwomanContainer extends Component {
    constructor(props){
        super(props)
    }

    render(){
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
                        <FormControl type="text" />
                        <InputGroup.Button>
                        <Button>Send</Button>
                        </InputGroup.Button>
                    </InputGroup>
                    </FormGroup>
            </div>
        )
    }
}
