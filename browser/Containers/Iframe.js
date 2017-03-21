import React, { Component } from 'react';


export default class extends Component {
	constructor(props) {
		super(props)
		// this.init = this.init.bind(this);
	}

	// componentDidMount() {
	// 	this.init();
	// }

	// init() {
	// 	// Create a new blank iframe
	// 	var newIframe = document.createElement('iframe');
	// 	// Set attributes for iFrame (do whatever suits)
	// 	newIframe.width = '545px'; newIframe.height = '810px';
	// 	// This for the src makes it 'friendly'
	// 	newIframe.src = 'about:blank';

	// 	// Use whatever method is needed to insert the iframe where you want it
	// 	document.getElementById("frame").appendChild(newIframe);
	// 	// document.body.appendChild(newIframe);
	// 	// Make this reference your hidden div containing the markup you want to insert
	// 	let getHTML = this.props.code.htmlString;
	// 	// var getHTML = $('#HTMLblock').html();

	// 	// List any CSS you want to reference within the iframe
	// 	// var CSS = '<link rel="stylesheet" href="https://external.com/css/styles.css">';
	// 	// let CSS = `<style>${this.props.code.cssString}</style>`
	// 	let CSS = '<style>' + this.props.code.cssString + '</style>';

	// 	// List any JS you want to reference within the iframe
	// 	// var JS = '<script src="http://external.com/js/plugins.js"></script>';
	// 	let JS = '<script>' + this.props.code.jsString + '</script>';

	// 	// Now sticch it all together into one thing to insert into the iframe
	// 	var myContent = '<!DOCTYPE html>' + '<html><head><title>Rendered HTML from Pattern</title>' + CSS + '</head><body>' + getHTML + JS + '</body></html>';

	// 	// Use the JavaScript methods to write to the iFrame, then close it
	// 	newIframe.contentWindow.document.open('text/html', 'replace');
	// 	newIframe.contentWindow.document.write(myContent);
	// 	newIframe.contentWindow.document.close();
	// }

	render() {
		return (
			<div>
				<div id="frame" />
			</div>
		);
	}
}

