import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router';
import HTMLEditor from './HTMLEditor';
import {updateHTML, updateCSS, updateJS, updateServer, updateDatabase} from '../reducers/code';

class AppContainer extends Component {
  constructor(props){
    super(props)
  }
  render(){
    console.log("Inside App Container rendering the entire page", this.props.children);
    var children = React.Children.map(this.props.children, (child) => {
      const handleHTMLUpdate = this.props.handleHTMLUpdate;
      const handleCSSUpdate = this.props.handleCSSUpdate;
      const handleJSUpdate = this.props.handleJSUpdate;
      const handleServerUpdate = this.props.handleServerUpdate;
      const handleDatabaseUpdate = this.props.handleDatabaseUpdate;
      return React.cloneElement(child, {
        code: this.props.code,
        handlers: {handleHTMLUpdate, handleCSSUpdate, handleJSUpdate, handleServerUpdate, handleDatabaseUpdate}
      })
    });
    return(
        <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                  <div className="navbar-header">
                      <Link className="navbar-brand" to="/">Text Editor</Link>
                  </div>
                  <ul className="nav navbar-nav nav-tabs">
                      <li className="active"><Link to="/html">HTML</Link></li>
                      <li><Link to="/css">CSS</Link></li>
                      <li><Link to="/javascript">Javascript</Link></li>
                      <li><Link to="/server">Server</Link></li>
                      <li><Link to="/database">Database</Link></li>
                  </ul>
                  <ul className="nav navbar-nav navbar-right">
                    <li><a href="#">Sign Up</a></li>
                    <li><a href="#">Sign In</a></li>
                  </ul>
              </div>
          </nav>
            {children}
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    code: state.code
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleHTMLUpdate(htmlString) {
      dispatch(updateHTML(htmlString));
    },
    handleCSSUpdate(cssString) {
      dispatch(updateCSS(cssString));
    },
    handleJSUpdate(jsString) {
      dispatch(updateJS(jsString));
    },
    handleServerUpdate(serverString) {
      dispatch(updateServer(serverString));
    },
    handleDatabaseUpdate(databaseString) {
      dispatch(updateDatabase(databaseString));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
