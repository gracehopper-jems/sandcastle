import React from 'react';

export default class AllPuppies extends React.Component {

  render () {
    return (
      <div className="container flexbox-container">
        <div className="jumbotron">
          <ul className="list-unstyled">
            <li><a>PUPPY NAME GOES HERE</a></li>
            <li><a>PUPPY NAME GOES HERE</a></li>
            <li><a>PUPPY NAME GOES HERE</a></li>
          </ul>
        </div>
      </div>
    )
  }
}