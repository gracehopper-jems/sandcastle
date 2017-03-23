import React from 'react';

const ServerEditor = props => {
  console.log('props in server', props);
  return (
    <div className="container-fluid" style={props.style}>
      <div className="row">
        <div className="col-md-12">
          <div id="server-firepad-container"></div>
        </div>
      </div>
    </div>
  );
};

export default ServerEditor;
