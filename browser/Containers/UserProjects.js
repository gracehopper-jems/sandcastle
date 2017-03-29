import React, { Component } from 'react';
import axios from 'axios';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default class UserProjects extends Component {

  constructor(props) {
    super(props);
    this.state = {
        open: false,
        projects: [],
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle(){
      return axios.get(`/api/${this.props.user.userId}`)
      .then((projects) => {
          console.log("getting the projects", this.state.projects);
          this.setState({open: !this.state.open, projects: projects.data});
          console.log("getting the projects affter", this.state.projects);
      })
      .catch(console.error)
  }

  handleClose(){
      this.setState({open: false});
  }

  render() {
    return (
      <div>
        <RaisedButton
          label="My Projects"
          primary={true}
          onTouchTap={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <h2>My Awesome Projects</h2>
          { this.state.projects.map((project) => {
                  return (<MenuItem onTouchTap={this.handleClose}>{project.hashedProjectId}</MenuItem>)
          })}
        </Drawer>
      </div>
    );
  }
}
