import React from 'react';

const WelcomeMessage = (props) => {
		console.log('Welcome page triggered');
  	return (
	    <div className="jumbotron welcome">
	    <div className="welcome-inner">
				<h1>Welcome to Sandcastle!</h1>
				<hr />
				<img src="sandcastle.png" alt="Sandcastle"/>
				<h2>Sandcastle is an in-browser text editor that lets you try out frontend and backend code.</h2>
				<br/>
				<h2>Please sign up or log in to begin using Sandcastle today!</h2>
				</div>
			</div>
	)
}

export default WelcomeMessage;
