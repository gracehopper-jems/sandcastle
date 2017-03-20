// import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';

// export default class SaveButton extends Component {
// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			isSaved: false
// 		};

// 		this.handleClick = this.handleClick.bind(this);
// 	}

// 		handleClick() {
// 			this.setState({isSaved: true});
// 			// This probably where you would have an `ajax` call
// 			this.props.handlers

// 			setTimeout(() => {
// 				// Completed of async action, set Saved state back
// 				this.setState({isSaved: false});
// 			}, 2000);
// 		}

// 		render() {
// 			console.log('props for Saved button', this.props);
// 			let isSaved = this.state.isSaved;
// 			return (
// 				<Button
// 					bsStyle="primary"
// 					disabled={isSaved}
// 					onClick={!isSaved ? this.handleClick : null}>
// 					{isSaved ? 'Saving your code...' : 'Save'}
// 				</Button>
// 			);
// 		}
// }
