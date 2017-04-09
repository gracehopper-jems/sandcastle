import React, { Component } from 'react';
import axios from 'axios';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Link, browserHistory } from 'react-router';
import { updateCurrentProject, updateAllCode } from '../reducers';

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
          this.props.handlers.handleUpdateAllCode(code);
      })
      .then(() => {
        // this will cause the functionality for `share` in main.js to be triggered
          browserHistory.push(`/share${hashedProjectId}`);
          // once the page has reloaded and registers that the string "share" is in the URL bar
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
