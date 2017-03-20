import React, {Component} from 'react';
import { Link } from 'react-router';

export default class AppContainer extends Component {
  constructor(props){
    super(props)
  }

    render(){
      console.log("Inside App Container rendering the entire page", this.props.children);
        return(
            <div>
                <nav className="navbar navbar-default">
                  <div className="container-fluid">
                      <div className="navbar-header">
                          <Link className="navbar-brand" to="/">Text Editor</Link>
                      </div>
                      <ul className="nav navbar-nav">
                          <li><Link to="/html">HTML</Link></li>
                          <li><Link to="/css">CSS</Link></li>
                          <li><Link to="/javascript">Javascript</Link></li>
                          <li><Link to="/server">Server</Link></li>
                          <li><Link to="/database">Database</Link></li>
                      </ul>
                  </div>
              </nav>
                {this.props.children}
            </div>
        );
    }
}
