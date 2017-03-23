import React from 'react';
import axios from 'axios';

const BackendButton = (props) => {

  function handleClick (event) {
    event.preventDefault();

    axios.post('/container', {userId: props.user.userId,userRoutes: props.code.serverString, userModels: props.code.databaseString})
    .then(() => {
      console.log('running container');
    })
    .catch(console.error);
  }

  return (
    <div>
      <a href="#"
        onClick={handleClick}>Run Backend
      </a>
    </div>
  )
}

export default BackendButton;



