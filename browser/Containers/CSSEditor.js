import React from 'react';

const CSSEditor = props => {
  console.log('PROPS IN CSS', props);
  return (
    <div className="container-fluid" style={props.style}>
      <div className="row">
        <div className="col-md-12">
          <div id="css-firepad-container"></div>
        </div>
      </div>
    </div>
  );
};

export default CSSEditor;
