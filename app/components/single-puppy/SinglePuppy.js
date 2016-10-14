import React, { Component } from 'react';

export default class SinglePuppy extends Component {

  componentDidMount () {
    // this.props.onLoadSinglePuppy();
  }

  render () {
    return (
      <div className="container">
        <div className="col col-md-12">
          <h2>{ this.props.puppy.name }</h2>
          <div>
            <img src={this.props.puppy.image} />
          </div>
        </div>
      </div>
    )
  }
}