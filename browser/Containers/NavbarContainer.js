import React, {Component} from 'react';
import { Link, browserHistory } from 'react-router';
import LoadingButton from './LoadingButton';
import BackendButton from '../Components/BackendButton';
import firebase from 'firebase';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import SigninModal from '../Components/SigninModal';
import SaveButton from '../Components/SaveButton';
import UserProjects from './UserProjects';
import ShareButton from '../Components/ShareButton';

export default class NavbarContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            signup: false,
            signin: false
        }
    this.handleSignin = this.handleSignin.bind(this);
    this.showSigninModal = this.showSigninModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleClose = this.handleClose.bind(this);
}
    handleChange(event){
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
    }

    handleSignin(event){
        event.preventDefault();
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            const user = firebase.auth().currentUser;
            const userId = user.uid;
            this.props.handlers.handleSignin(userId);

            axios.post('/setUser', {userId: userId})
            .then(() => {
                console.log('posting userid');
                this.setState({signin: false, modal: false})
            })
            .catch(console.error);
        })
        .catch(err => alert("Invalid log in!"));
    }

    handleSignout(event) {
        event.preventDefault();
        this.setState({email: '', password: ''});
        firebase.auth().signOut()
        .then(() => {
            return axios.get('/removeContainer')
            .then((res) => {
                console.log('removing container');
                console.log('res', res)
            });
        })
        .then(() => {
            this.props.handlers.handleSignout();
            console.log('removing userid');
            return axios.get('/removeUser')
        })
        .catch(console.error)
    }

    handleSignup(event) {
        event.preventDefault();
        browserHistory.push('/signup');
        this.setState({signup: true})
    }

    showSigninModal(event) {
        event.preventDefault();
        this.setState({signin: true})
    }

    handleClose(event){
        event.preventDefault();
        this.setState({signin: false, signup: false});
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
                            <Link className="navbar-brand" to="/">
                                <span>
                                    <img src='https://cdn0.iconfinder.com/data/icons/map-and-navigation-2/65/79-128.png' width="25px" height="25px" className="sandcastle-icon"/>
                                    Sandcastle
                                </span>
                            </Link>
                        </div>
                        <ul className="nav navbar-nav nav-tabs">

                            { this.props.user.userId !== '' ? <li><a><LoadingButton code={this.props.code} handlers={this.props.handlers} /></a></li> : null }

                            {this.props.user.userId !== '' ? <li><a><BackendButton docker={this.props.docker} code={this.props.code} handlers={this.props.handlers} user={this.props.user} /></a></li> : null}

                            {this.props.user.userId !== '' ? <li><a><SaveButton code={this.props.code} handlers={this.props.handlers} user={this.props.user} /></a></li> : null}

                            {this.props.user.userId !== '' ? <li><UserProjects code={this.props.code} handlers={this.props.handlers} user={this.props.user} /></li> : null}

                                                        {this.props.user.userId !== '' ? <li><a><ShareButton code={this.props.code} handlers={this.props.handlers} user={this.props.user} /></a></li> : null}

                            {this.state.signin ?
                                <SigninModal handleSignin={this.handleSignin} handleChange={this.handleChange} handleClose={this.handleClose} /> : null
                            }

                            {this.state.signup ? (<div className="static-modal">
                                    <Modal.Dialog>
                                    <Modal.Header>
                                        <Modal.Title>Sign Up</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        {children} {/*this is where the signup form shows up*/}
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button onClick={this.handleClose}>Close</Button>
                                    </Modal.Footer>

                                    </Modal.Dialog>
                                </div>) : null}
                        </ul>

                        {this.props.user.userId !== ''
                        ?
                            <ul className="nav navbar-nav navbar-right">
                                <li>
                                    <button className="btn btn-primary" onClick={this.handleSignout}>Sign Out</button>
                                </li>
                            </ul>
                        :
                            <div className="nav navbar-nav navbar-right">
                            <li>
                                <button type="submit" className="btn btn-primary" onClick={this.showSigninModal}>Sign In</button>
                            </li>
                            <li>
                                <button type="submit" className="btn btn-info" onClick={this.handleSignup} >Sign Up</button>
                            </li>
                            </div>
                        }
                    </div>
                </nav>
            </div>
        )
    }
}

// export default class NavbarContainer extends Component {
//     constructor(props){
//         super(props)
//         this.state = {
//             email: "",
//             password: "",
//             signup: false,
//         }

//     this.handleSignin = this.handleSignin.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSignout = this.handleSignout.bind(this);
//     this.handleSignup = this.handleSignup.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
// }
//     handleChange(event){
//         const value = event.target.value;
//         const name = event.target.name;
//         this.setState({ [name]: value });
//     }

//     handleSignin(event){
//         event.preventDefault();
//         const {email, password} = this.state;
//         firebase.auth().signInWithEmailAndPassword(email, password)
//         .then( () => {
//             const user = firebase.auth().currentUser;
//             const userId = user.uid;
//             this.props.handlers.handleSignin(userId);

//             axios.post('/setUser', {userId: userId})
//             .then(() => {
//                 console.log('posting userid');
//             })
//             .catch(console.error);
//         })
//         // .catch(console.error);
//         .catch(err => alert("Invalid log in!"));
//     }

//     handleSignout(event) {
//         event.preventDefault();
//         this.setState({email: '', password: ''});
//         firebase.auth().signOut()
//         .then(() => {
//             return axios.get('/removeContainer')
//             .then((res) => {
//                 console.log('removing container');
//                 console.log('res', res)
//             });
//         })
//         .then(() => {
//             this.props.handlers.handleSignout();
//             return axios.get('/removeUser')
//         })
//         .then(() => {
//             console.log('removing userid');
//         })
//         .then(() => {
//             window.location.reload();
//         })
//         .catch(console.error)
//     }

//     handleSignup(event) {
//         event.preventDefault();
//         browserHistory.push('/signup');
//         this.setState({signup: true})
//     }

//     handleSubmit(event){
//         event.preventDefault();
//         this.setState({signup: false});
//         browserHistory.push('/');
//     }

//     render(){
//         const children = React.Children.map(this.props.children, (child) => {
//         return React.cloneElement(child, {
//             code: this.props.code,
//             handlers: this.props.handlers,
//             user: this.props.user
//         })
//         });

//         return (
//             <div>
//                 <nav className="navbar navbar-default">
//                     <div className="container-fluid">
//                         <div className="navbar-header">
//                             <Link className="navbar-brand" to="/">
//                                 <span>
//                                     <img src='https://cdn0.iconfinder.com/data/icons/map-and-navigation-2/65/79-128.png' width="25px" height="25px" />
//                                     Sandcastle
//                                 </span>
//                             </Link>
//                         </div>
//                         <ul className="nav navbar-nav nav-tabs">

//                             { this.props.user.userId !== '' ? <li><a><LoadingButton code={this.props.code} handlers={this.props.handlers} /></a></li> : null }
//                             { this.props.user.userId !== '' ?  <li><a><BackendButton docker={this.props.docker} code={this.props.code} handlers={this.props.handlers} user={this.props.user}/></a></li> : null}

//                             {this.state.signup ?
//                                 (<div className="static-modal">
//                                     <Modal.Dialog>
//                                     <Modal.Header>
//                                         <Modal.Title>Sign Up</Modal.Title>
//                                     </Modal.Header>

//                                     <Modal.Body>
//                                         {children} {/*this is where the signup form shows up*/}
//                                     </Modal.Body>

//                                     <Modal.Footer>
//                                         <Button onClick={this.handleSubmit}>Close</Button>
//                                     </Modal.Footer>

//                                     </Modal.Dialog>
//                                 </div>) : null
//                             }
//                         </ul>

//                         {this.props.user.userId !== ''
//                         ?
//                             <ul className="nav navbar-nav navbar-right">
//                                 <li>
//                                     <button className="btn btn-primary" onClick={this.handleSignout}>Sign Out</button>
//                                 </li>
//                             </ul>
//                         :
//                             <form className="form-inline" onSubmit={this.handleSignin} >
//                                 <ul className="nav navbar-nav navbar-right">
//                                     <li>
//                                         <label className="sr-only" htmlFor="inlineFormInput">Email</label>
//                                         <input name="email" type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Email" onChange={this.handleChange} />
//                                     </li>
//                                     <li>
//                                         <label className="sr-only" htmlFor="inlineFormInputGroup">Password</label>
//                                         {/*<div className="input-group mb-2 mr-sm-2 mb-sm-0">*/}
//                                             <input name="password" type="password" className="form-control" id="inlineFormInputGroup" placeholder="Password" onChange={this.handleChange} />
//                                         {/*</div>*/}
//                                     </li>
//                                     <li>
//                                         <button type="submit" className="btn btn-primary">Sign In</button>
//                                     </li>
//                                     <li>
//                                         <button type="submit" className="btn btn-info" onClick={this.handleSignup} >Sign Up</button>
//                                     </li>
//                                 </ul>
//                             </form>
//                         }
//                     </div>
//                 </nav>
//             </div>
//         )
//     }
// }
