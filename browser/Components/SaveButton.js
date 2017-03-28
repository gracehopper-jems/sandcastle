import React, { Component } from 'react';
import axios from 'axios';

export default class SaveButton extends Component {
	constructor(props) {
		super(props)
		this.handleSave = this.handleSave.bind(this);
	}

	handleSave(event) {
		event.preventDefault();
		// console.log(typeof JSON.stringify(this.props.code));
		// post to db
		console.log('clicked save');
		const stringifiedCode = JSON.stringify(this.props.code);
		axios.post(`/api/${this.props.user.userId}`, { code: stringifiedCode })
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
