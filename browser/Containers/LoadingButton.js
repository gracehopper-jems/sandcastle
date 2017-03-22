import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class LoadingButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false
		};

		this.handleClick = this.handleClick.bind(this);
	}

		handleClick() {
			this.setState({isLoading: true});
			// This probably where you would have an `ajax` call
			init(this.props);

			setTimeout(() => {
				// Completed of async action, set loading state back
				this.setState({isLoading: false});
			}, 2000);
		}

		render() {
			let isLoading = this.state.isLoading;
			return (
			  <div>
					<Button
						bsStyle="primary"
						disabled={isLoading}
						onClick={!isLoading ? this.handleClick : null}>
						{isLoading ? 'Running your code...' : 'Run'}
					</Button>
				</div>
			);
		}
}


function init(props) {
		// Create a new blank iframe
		var newIframe = document.createElement('iframe');
		// Set attributes for iFrame (do whatever suits)
		newIframe.width = '545px'; newIframe.height = '810px';
		// This for the src makes it 'friendly'
		newIframe.src = 'about:blank';

		// Use whatever method is needed to insert the iframe where you want it
		document.getElementById("frame").appendChild(newIframe);
		// Make this reference your hidden div containing the markup you want to insert
		let getHTML = props.code.htmlString;

		// List any CSS you want to reference within the iframe
		let CSS = '<style>' + props.code.cssString + '</style>';

		// List any JS you want to reference within the iframe
		let JS = '<script>' + props.code.jsString + '</script>';

		// Now sticch it all together into one thing to insert into the iframe
		var myContent = '<!DOCTYPE html>' + '<html><head><title>Rendered HTML from Pattern</title>' + CSS + '</head><body>' + getHTML + JS + '</body></html>';

		// Use the JavaScript methods to write to the iFrame, then close it
		newIframe.contentWindow.document.open('text/html', 'replace');
		newIframe.contentWindow.document.write(myContent);
		newIframe.contentWindow.document.close();
	}
