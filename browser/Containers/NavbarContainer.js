import React, {Component} from 'react';
import { Link, browserHistory } from 'react-router';
import LoadingButton from './LoadingButton';
import BackendButton from '../Components/BackendButton';
import firebase from 'firebase';

export default class NavbarContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            currentFirepad: 'html'
        }
    this.handleSignin = this.handleSignin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
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
            console.log('user on sign in', user)
            const userId = user.uid;
            this.props.handlers.handleSignin(userId);
        })
        .catch(err => alert("Invalid log in!"))
    }

  handleSignout(event) {
    event.preventDefault();
    this.setState({email: '', password: ''});
    firebase.auth().signOut()
    .then(() => {
      this.props.handlers.handleSignout();
    })
    .catch(console.error)
  }

  handleSignup(event) {
    event.preventDefault();
    browserHistory.push('/signup');
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
                    <li><a href="#" id="html" onClick={() => this.onHTMLClick()} >HTML</a></li>
                    <li><a><LoadingButton code={this.props.code} handlers={this.props.handlers} /></a></li>
                    <li><a><BackendButton code={this.props.code} handlers={this.props.handlers} user={this.props.user}/></a></li>
                    {children} {/*this is where the signup form shows up*/}
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
