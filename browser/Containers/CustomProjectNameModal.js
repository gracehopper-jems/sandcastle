import React, { Component } from 'react';
import axios from 'axios';
const randomstring = require('randomstring');


export default class CustomProjectNameModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			projectName: '',
			text: '',
		};

		this.handleSave = this.handleSave.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSave(event) {
		event.preventDefault();
		// post to db
		const hashedProjectId = randomstring.generate(10);
		const projectName = this.state.projectName;

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
	}

	handleChange(event) {
		event.preventDefault();
		this.setState({ text: event.target.value });
	}

	render() {
		return (
			<div className="modal fade" tabIndex="-1" role="dialog">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 className="modal-title">Please enter a name for your project:</h4>
						</div>
						<div className="modal-body">
							<div className="input-group">
								{/*<span className="input-group-addon" id="basic-addon1">@</span>*/}
								<input type="text" className="form-control" placeholder="Username" aria-describedby="basic-addon1" onChange={this.handleChange} value={this.state.text} />
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary" onClick={this.handleSave}>Save</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

}
