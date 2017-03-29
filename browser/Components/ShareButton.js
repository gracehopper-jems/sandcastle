import React, { Component } from 'react';
import axios from 'axios';
const randomstring = require('randomstring');
import { Modal, Button } from 'react-bootstrap';


export default class ShareButton extends Component {
	constructor(props) {
		super(props); 
		this.state = {
			clicked: false, 
			projectId: "", 
			}; 
		this.handleSave = this.handleSave.bind(this);
		this.handleClose = this.handleClose.bind(this); 
	}

	handleSave(event) {
		event.preventDefault();
		// post to db
		const hashedProjectId = randomstring.generate(10);

		console.log('clicked share');
		const stringifiedCode = JSON.stringify(this.props.code);
		this.setState({clicked:true}); 
		this.setState({projectId: hashedProjectId}); 
		console.log("STATE", this.state)
		axios.post(`/api/${this.props.user.userId}`, { code: stringifiedCode, hashedProjectId })

		
	}

	handleClose(event){
		event.preventDefault(); 
		this.setState({clicked: false})
	}

	render() {
		console.log("STATE", this.state);

		return (
			<div> 
				{this.state.clicked ? 

				( <div className="static-modal">
				    <Modal.Dialog>
				      <Modal.Header>
				        <Modal.Title>Sharing is Caring!</Modal.Title>
				      </Modal.Header>

				      <Modal.Body>
				        {`You can share a snapshot of your project with this link ${this.state.projectId}.`}
				      </Modal.Body>

				      <Modal.Footer>
				        <Button onClick={this.handleClose} >Close</Button>
				      </Modal.Footer>

				    </Modal.Dialog>
				 </div> ) : 

				( <div onClick={this.handleSave}>
					Share
				</div> ) 
				}
			</div>
		);
	}
}
