import React, { Component } from 'react';
import axios from 'axios';
const randomstring = require('randomstring');



export default class SaveButton extends Component {
	constructor(props) {
		super(props)
		this.handleSave = this.handleSave.bind(this);
	}

	handleSave(event) {
		event.preventDefault();
		// post to db
		const hashedProjectId = randomstring.generate(10);

		console.log('clicked save');
		const stringifiedCode = JSON.stringify(this.props.code);
		axios.post(`/api/user/${this.props.user.userId}`, { code: stringifiedCode, hashedProjectId })
			.then(() => {
				console.log('posted successfully');
			});
	}

	render() {
		return (
			<div onClick={this.handleSave}>
				Save
			</div>
		);
	}
}
