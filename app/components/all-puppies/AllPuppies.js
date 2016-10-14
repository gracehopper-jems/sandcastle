import React, { Component } from 'react';
import { Link } from 'react-router';

export default class AllPuppies extends Component {

  componentDidMount () {
    this.props.onLoadPuppies();
  }

  render () {
    return (
      <div className="container">
        <div className="col-md-12">
          {
            this.props.puppies.map(puppy => {
              return (
                <ul key={puppy.id} className="list-unstyled">
                  <li>
                    <Link to={"/puppies/" + puppy.id}> { puppy.name }</Link>
                  </li>
                </ul>
              )
            })
          }
        </div>
      </div>
    );
  }
}