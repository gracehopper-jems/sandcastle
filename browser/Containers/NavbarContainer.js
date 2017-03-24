import React, {Component} from 'react';
import { Link, browserHistory } from 'react-router';
import LoadingButton from './LoadingButton';
import BackendButton from '../Components/BackendButton';
import firebase from 'firebase';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

export default class NavbarContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            signup: false,
        }
    this.handleSignin = this.handleSignin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
}
    handleChange(event){
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
    }

    handleSignin(event){
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( () => {
            const user = firebase.auth().currentUser;
            const userId = user.uid;
            this.props.handlers.handleSignin(userId);

            axios.post('/setUser', {userId: userId})
            .then(() => {
                console.log('posting userid');
            })
            .catch(console.error);
        })
        .catch(err => alert("Invalid log in!"))
    }

  handleSignout(event) {
    event.preventDefault();
    this.setState({email: '', password: ''});
    firebase.auth().signOut()
    .then(() => {
        this.props.handlers.handleSignout();
        axios.get('/removeUser')
        .then(() => {
            console.log('removing userid');
        })
    })
    .catch(console.error)
}

  handleSignup(event) {
    event.preventDefault();
    browserHistory.push('/signup');
    this.setState({signup: true})
  }

  handleSubmit(event){
    event.preventDefault(); 
    this.setState({signup: false}); 
    browserHistory.push('/');
  }

render(){
    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        code: this.props.code,
        handlers: this.props.handlers,
        user: this.props.user
      })
    });

    return (
        <div>
        <nav className="navbar navbar-default">
              <div className="container-fluid">
                  <div className="navbar-header">
                      <Link className="navbar-brand" to="/">Text Editor</Link>
                  </div>

                  <ul className="nav navbar-nav nav-tabs">
                    <li><a><LoadingButton code={this.props.code} handlers={this.props.handlers} /></a></li>
                    <li><a><BackendButton code={this.props.code} handlers={this.props.handlers} user={this.props.user}/></a></li>

                    {this.state.signup ?
                      (<div className="static-modal">
                        <Modal.Dialog>
                          <Modal.Header>
                            <Modal.Title>Sign Up</Modal.Title>
                          </Modal.Header>

                          <Modal.Body>
                             {children} {/*this is where the signup form shows up*/}
                          </Modal.Body>

                          <Modal.Footer>
                            <Button onClick={this.handleSubmit}>Close</Button>
                          </Modal.Footer>

                        </Modal.Dialog>
                      </div>) : null
                  }

                  </ul>

                  {
            this.props.user.userId !== '' 
                ?
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <button className="btn btn-primary" onClick={this.handleSignout}>Sign Out</button>
                    </li>
                </ul>
                :
                <form className="form-inline" onSubmit={this.handleSignin} >
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <label className="sr-only" htmlFor="inlineFormInput">Email</label>
                            <input name="email" type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Email" onChange={this.handleChange} />
                        </li>
                        <li>
                            <label className="sr-only" htmlFor="inlineFormInputGroup">Password</label>
                            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                <input name="password" type="password" className="form-control" id="inlineFormInputGroup" placeholder="Password" onChange={this.handleChange} />
                            </div>
                        </li>
                        <li>
                            <button type="submit" className="btn btn-primary">Sign In</button>
                        </li>
                        <li>
                            <button type="submit" className="btn btn-info" onClick={this.handleSignup} >Sign Up</button>
                        </li>
                    </ul>
                </form>
        }

              </div>
        </nav>
        </div>
    )
}

}
