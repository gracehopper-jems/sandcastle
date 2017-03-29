import React, { Component } from 'react';
import axios from 'axios';
const randomstring = require('randomstring');
// import CustomProjectNameModal from '../Containers/CustomProjectNameModal';
import store from '../store';
import { Modal, Button } from 'react-bootstrap';



export default class SaveButton extends Component {
	constructor(props) {
		super(props);

	}
	render() {
		// const storeState = store.getState();
		// const renderModal = storeState.loading.renderModal;
		// console.log('RENDER MODAL?', renderModal);
		return (

				<div onClick={this.props.handleSaveModal}>
					Save
				</div>

		);
	}
}



			// <div>
			// 	<div>
			// 		{renderModal ? <CustomProjectNameModal code={this.props.code} handlers={this.props.handlers} user={this.props.user} /> : null}
			// 	</div>
			// </div>
