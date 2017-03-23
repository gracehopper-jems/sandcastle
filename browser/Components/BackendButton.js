import React from 'react';
import axios from 'axios';

const BackendButton = (props) => {

  function handleClick (event) {
    event.preventDefault();

    axios.post('/container', {userRoutes: props.code.serverString, userModels: props.code.databaseString})
    .then(() => {
      console.log('running container');
    })
    .catch(console.error);
  }

  return (
    <div>
      <li
        onClick={handleClick}>Run Backend
      </li>
    </div>
  )
}

export default BackendButton;



