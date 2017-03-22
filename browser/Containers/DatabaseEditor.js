import React from 'react';

const DatabaseEditor = props => {
  console.log('props in db', props);
  return (
    <div className="container-fluid" style={props.style}>
      <div className="row">
        <div className="col-md-12">
          <div id="db-firepad-container"></div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseEditor;
