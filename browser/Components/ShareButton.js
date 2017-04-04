import React, { Component } from 'react';
import axios from 'axios';
const randomstring = require('randomstring');
import { Modal, Button } from 'react-bootstrap';
const appURL = require('../../variables').appURL; 


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
				const hashedProjectId = randomstring.generate(10);
				const stringifiedCode = JSON.stringify(this.props.code);
				this.setState({clicked:true});
				this.setState({projectId: hashedProjectId});
				axios.post(`/api/user/${this.props.user.userId}`, { code: stringifiedCode, hashedProjectId })
		}

		handleClose(event){
				event.preventDefault();
				this.setState({clicked: false});
		}

		render() {
				return (
						<div>
								{this.state.clicked ?

									( <div className="static-modal">
									    <Modal.Dialog>
										      <Modal.Header>
										        	<Modal.Title>Share your project with this link:</Modal.Title>
										      </Modal.Header>

										      <Modal.Body>
										        	{`${appURL}/share${this.state.projectId}`}
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
