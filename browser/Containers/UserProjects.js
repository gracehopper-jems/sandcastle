import React, { Component } from 'react';
import axios from 'axios';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Link, browserHistory } from 'react-router';
import { updateCurrentProject } from '../reducers';

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
        axios.get(`/api/user/${this.props.user.userId}`)
        .then((projects) => {
            if (projects.data !== '') {
                this.setState({open: !this.state.open, projects: projects.data});
            } else {
                this.setState({open: !this.state.open});
            }
        })
        .catch(console.error)
    }

    handleClose(){
        this.setState({open: false});
    }

    handleOpenProject(hashedProjectId){
      return axios.get(`api/project/${hashedProjectId}`)
      .then((project) => {
          this.props.handlers.handleCurrentProjectUpdate(project.data.hashedProjectId);
          return JSON.parse(project.data.code)
      })
      .then((code) => {
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
          browserHistory.push(`/share${hashedProjectId}`);
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
                  {this.state.projects && this.state.projects.length === 0
                      ?
                      <div className="no-projects">
                          <center>You have no saved projects.</center>
                      </div>
                      :
                      null
                  }
                  {this.state.projects && this.state.projects.length > 0 && this.state.projects.map((project, i) => {
                      return (
                          <MenuItem
                              key={project.id}
                              onClick={() => this.handleOpenProject(this.state.projects[i].hashedProjectId)}>
                              {project.projectName ? project.projectName : 'untitled'}
                          </MenuItem>);
                  })}
            </Drawer>
          </div>
      );
    }
}
