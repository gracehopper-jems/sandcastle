import React, { Component } from 'react';
import axios from 'axios';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Link, browserHistory } from 'react-router';

export default class UserProjects extends Component {

  constructor(props) {
    super(props);
    this.state = {
        open: false,
        projects: [],
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpenProject = this.handleOpenProject.bind(this);
  }

  handleToggle(){
      return axios.get(`/api/user/${this.props.user.userId}`)
      .then((projects) => {
          console.log("getting the projects", this.state.projects);
          this.setState({open: !this.state.open, projects: projects.data});
          console.log("getting the projects after", this.state.projects);
      })
      .catch(console.error)
  }

  handleClose(){
      this.setState({open: false});
  }

  handleOpenProject(hashedProjectId){
    return axios.get(`api/project/${hashedProjectId}`)
    .then((project) => {
        console.log('GETTING YOUR PROJECT', (project.data.code));
        console.log('DAPROPS', this.props)
        return JSON.parse(project.data.code)
    })
    .then((code) => {
        console.log('PARSED CODE', code)
        this.props.handlers.handleHTMLUpdate(code.htmlString);
        return code
    })
    .then((code) => {
        this.props.handlers.handleCSSUpdate(code.cssString);
        return code
    })
    .then((code) => {
        this.props.handlers.handleJSUpdate(code.jsString);
        return code
    })
    .then((code) => {
        this.props.handlers.handleDatabaseUpdate(code.databaseString);
        return code
    })
    .then((code) => {
        this.props.handlers.handleServerUpdate(code.serverString);
    })
    .then(() => {
        // browserHistory.push(`api/project/${hashedProjectId}`);
        window.location.reload()
        this.setState({open: false});
    })
    .catch(console.error)
  }


  render() {
    const buttonStyle = {
        margin: '6px',
    };

    return (
      <div>
        <RaisedButton
          label="My Projects"
          secondary={true}
          onTouchTap={this.handleToggle}
          style={buttonStyle}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <h2>My Saved Projects</h2>
            {this.state.projects && this.state.projects.map((project) => {
                return (
                    <MenuItem
                        key={project.id}
                        onClick={() => this.handleOpenProject(this.state.projects[project.id-1].hashedProjectId)}>
                    {project.hashedProjectId}
                    </MenuItem>)
            })}
        </Drawer>
      </div>
    );
  }
}

// {this.state.projects && this.state.projects.map((project) => {
//                   return (
//                     <MenuItem
//                         key={project.id}
//                         onClick={() => this.handleOpenProject(this.state.projects[project.id-1].hashedProjectId)}>
//                     {project.hashedProjectId}
//                     </MenuItem>)
//           })}
