import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import Progress, { ProgressModal } from '../Components/ProgressIndicator';
import tour from '../../tour';
import store from '../store';

export default class LoadingButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false
		};

		this.handleClick = this.handleClick.bind(this);
	}

	// componentDidMount() {
	// 	console.log('PROPS IN LB', this.props);
	// 	console.log('STORE STATE IN LOADING BUTTON', store.getState());
	// 	console.log('LOCAL STATE IN LoadingButton', this.state);
	// 	tour.init();
	// 	setTimeout(function () {
	// 		tour.start(true);
	// 	}, 1000);
	// }

	handleClick() {
		this.setState({isLoading: true});
		// This probably where you would have an `ajax` call
		updateIframeContents(this.props);

		setTimeout(() => {
			// Completed of async action, set loading state back
			this.setState({isLoading: false});
		}, 2000);
	}

	render() {
		let isLoading = this.state.isLoading;
		return (
			<div
				disabled={isLoading}
				onClick={!isLoading ? this.handleClick : null}>
				{isLoading ? <ProgressModal view={'Frontend'} /> : 'Run Frontend'}
			</div>
		);
	}
}

function updateIframeContents(props) {
	let currentIframe = document.getElementById('frame').children;

	let getHTML = props.code.htmlString;
	let CSS = '<style>' + props.code.cssString + '</style>';
	let JS = '<script>' + props.code.jsString + '</script>';

	var myContent = '<!DOCTYPE html>' + '<html><head><title>Rendered HTML from Pattern</title>' + CSS + '</head><body>' + getHTML + JS + '</body></html>';

	currentIframe[0].contentWindow.document.open('text/html', 'replace');
	currentIframe[0].contentWindow.document.write(myContent);
	currentIframe[0].contentWindow.document.close();
}
