import React, { Component } from 'react';
import axios from 'axios';
const randomstring = require('randomstring');
import { Modal, Button } from 'react-bootstrap';



export default class CustomProjectNameModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			projectName: '',
			// text: '',
			// renderModal: this.props.renderModal,
		};

		this.handleSave = this.handleSave.bind(this);
		this.handleChange = this.handleChange.bind(this);
		// this.onSaveClick = this.onSaveClick.bind(this);
	}

	handleSave(event) {
		event.preventDefault();
		// post to db
		const hashedProjectId = randomstring.generate(10);
		// const projectName = this.state.projectName;

		console.log('clicked save');
		const stringifiedCode = JSON.stringify(this.props.code);
		axios.post(`/api/user/${this.props.user.userId}`, {
			code: stringifiedCode,
			projectName: this.state.projectName,
			hashedProjectId: hashedProjectId,
		})
			.then(() => {
				console.log('posted successfully');
			});
		this.props.handleModalClose();
	}

	handleChange(event) {
		event.preventDefault();
		this.setState({ projectName: event.target.value });
	}

	render() {
		return (
			<div className="static-modal">
				<Modal.Dialog>
					<Modal.Header>
						<Modal.Title>Please enter a name for your project:</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<form onSubmit={this.handleSave}>
							<div className="form-group">
								<label htmlFor="inlineFormInput">Name:</label>
								<input name="project-name" type="text" className="form-control" id="inlineFormInput" placeholder="Project Name" onChange={this.handleChange} autoFocus={focus} value={this.state.projectName} />
							</div>

								<Button type="submit">Save</Button>

						</form>
					</Modal.Body>

					<Modal.Footer>
            <Button onClick={this.props.handleSaveModalClose}>Close</Button>
         	</Modal.Footer>
				</Modal.Dialog>
			</div>
		);
	}

}
