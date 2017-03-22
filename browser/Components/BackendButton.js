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
      <button className="btn btn-info" onClick={handleClick}>Run Backend</button>
    </div>
  )
}

export default BackendButton;



