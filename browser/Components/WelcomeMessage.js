import React from 'react';

const WelcomeMessage = (props) => {

  	return (
	    <div className="jumbotron">
		{console.log('Welcome page triggered')}
		    <h1>Welcome to Sandcastle!</h1>
		    <hr />
		    <img src="sandcastle.png" alt="Sandcastle"/>
		    <h2>Sandcastle is an in-browser text editor that lets you try out frontend and backend code.</h2>
		    <br/>
		    <h2>Please sign up or log in to begin using Sandcastle today!</h2>
		</div>
	)
}

export default WelcomeMessage;
