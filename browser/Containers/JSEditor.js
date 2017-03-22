import React from 'react';

const JSEditor = props => {
  console.log('props in js', props);
  return (
    <div className="container-fluid" style={props.style}>
      <div className="row">
        <div className="col-md-12">
          <div id="js-firepad-container"></div>
        </div>
      </div>
    </div>
  );
};

export default JSEditor;
