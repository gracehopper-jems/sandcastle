import React, { Component } from 'react';
import store from './store';


const makeIframe = () => {
	let state = store.getState();
	// Create a new blank iframe
	var newIframe = document.createElement('iframe');
	// Set attributes for iFrame (do whatever suits)
	newIframe.width = '545px'; newIframe.height = '810px';
	// This for the src makes it 'friendly'
	newIframe.src = 'about:blank';

	// Use whatever method is needed to insertx the iframe where you want it
	document.getElementById('frame').appendChild(newIframe);
	// Make this reference your hidden div containing the markup you want to insert
	let getHTML = state.code.htmlString;

	// List any CSS you want to reference within the iframe
	// var CSS = '<link rel="stylesheet" href="https://external.com/css/styles.css">';
	let CSS = '<style>' + state.code.cssString + '</style>';

	// List any JS you want to reference within the iframe
	// var JS = '<script src="http://external.com/js/plugins.js"></script>';
	let JS = '<script>' + state.code.jsString + '</script>';

	// Now sticch it all together into one thing to insert into the iframe
	var myContent = '<!DOCTYPE html>' + '<html><head><title>Rendered HTML from Pattern</title>' + CSS + '</head><body>' + getHTML + JS + '</body></html>';

	// Use the JavaScript methods to write to the iFrame, then close it
	newIframe.contentWindow.document.open('text/html', 'replace');
	newIframe.contentWindow.document.write(myContent);
	newIframe.contentWindow.document.close();
};

export default makeIframe;

