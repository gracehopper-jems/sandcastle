import React from 'react';

const WelcomeMessage = (props) => {
		console.log('Welcome page triggered');
  	return (
		    <div className="jumbotron welcome">
			    	<div className="welcome-inner">
								<h1>Welcome to Sandcastle!</h1>

								<img src="sandcastle.png" alt="Sandcastle"/>
								<h3>Sandcastle is an in-browser text editor that lets you try out frontend and backend code.</h3>
								<br/>
								<h3>Please sign up or log in to begin using Sandcastle today!</h3>
						</div>
				</div>
		)
}

export default WelcomeMessage;
