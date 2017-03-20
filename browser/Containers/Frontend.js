import React, {Component} from 'react';
import { Link } from 'react-router';

export default class Frontend extends Component {
  constructor(props){
    super(props)
  }

    render(){
      console.log("Inside FrontEnd rendering the entire page", this.props.children);
        return(
            <div className="container">
                <nav className="navbar navbar-default" className="inner-nav">
                  <div className="container-fluid">
                      <ul className="nav navbar-nav">
                        <li><Link to="/html">HTML</Link></li>
                          <li><Link to="/css">CSS</Link></li>
                          <li><Link to="/javascript">Javascript</Link></li>
                      </ul>
                  </div>
              </nav>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
