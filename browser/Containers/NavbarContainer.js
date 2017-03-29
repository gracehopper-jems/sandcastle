import React, {Component} from 'react';
import { Link, browserHistory } from 'react-router';
import LoadingButton from './LoadingButton';
import BackendButton from '../Components/BackendButton';
import firebase from 'firebase';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import SigninModal from '../Components/SigninModal';
import SignupModal from '../Components/SignupModal';
import tour from '../../tour';
import SaveButton from '../Components/SaveButton';
import UserProjects from './UserProjects';
import store from '../store';
import ShareButton from '../Components/ShareButton';
import CustomProjectNameModal from './CustomProjectNameModal';

export default class NavbarContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			signup: false,
            signin: false,
            timeForTour: false,
            renderModal: false,
		};

		this.handleSignin = this.handleSignin.bind(this);
		this.showSigninModal = this.showSigninModal.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSignout = this.handleSignout.bind(this);
		this.handleSignup = this.handleSignup.bind(this);
		this.handleClose = this.handleClose.bind(this);
        this.handleBrandClick = this.handleBrandClick.bind(this);
        this.handleSaveModal = this.handleSaveModal.bind(this);
        this.handleSaveModalClose = this.handleSaveModalClose.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
	}

	handleChange(event) {
		const value = event.target.value;
		const name = event.target.name;
		this.setState({ [name]: value });
	}

	handleSignin(event) {
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
                    window.location.reload();
                })
                .catch(console.error);
            })
            .catch(err => alert("Invalid log in!"));
    }

	handleSignup(event) {
		event.preventDefault();
		browserHistory.push('/signup');
		this.setState({ signup: true, timeForTour: true })
	}

	showSigninModal(event) {
		event.preventDefault();
		this.setState({ signin: true })
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

    handleClose(event){
        event.preventDefault();
        const state = store.getState();

        if (state.loading.timeForTour) {
            tour.init();
            tour.restart(true);
            this.props.handlers.handleSetTimeForTourFalse();
        }
        this.setState({signin: false, signup: false, renderModal: false});
        window.location.reload();
    }

    handleBrandClick() {
		tour.restart();
    }

    handleSaveModal(event) {
        event.preventDefault();
        this.setState({ renderModal: true });
    }

    handleSaveModalClose(event) {
        event.preventDefault();
        this.setState({ renderModal: false });
    }

    handleModalClose() {
        this.setState({ renderModal: false });
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
                            <Link className="navbar-brand" to="/" onClick={this.handleBrandClick} id="sandcastle=tour">
                                <span>
                                    <img src='https://cdn0.iconfinder.com/data/icons/map-and-navigation-2/65/79-128.png' width="25px" height="25px" className="sandcastle-icon" />
                                    Sandcastle
                                </span>
                            </Link>
                        </div>
                        <ul className="nav navbar-nav nav-tabs">

                            {this.props.user.userId !== '' ? <li><a id="run-frontend"><LoadingButton code={this.props.code} handlers={this.props.handlers} /></a></li> : null}

                            {this.props.user.userId !== '' ? <li><a id="run-backend"><BackendButton docker={this.props.docker} code={this.props.code} handlers={this.props.handlers} user={this.props.user} /></a></li> : null}

                            {this.props.user.userId !== '' ? <li><a><SaveButton code={this.props.code} handlers={this.props.handlers} user={this.props.user} handleSaveModal={this.handleSaveModal} handleSaveModalClose={this.handleSaveModalClose} handleClose={this.handleClose} /></a></li> : null}

                            {this.props.user.userId !== '' ? <li><UserProjects code={this.props.code} handlers={this.props.handlers} user={this.props.user} /></li> : null}

                            {this.props.user.userId !== '' ? <li><a><ShareButton code={this.props.code} handlers={this.props.handlers} user={this.props.user} /></a></li> : null}

                            {this.state.signin ?
                                <SigninModal handleSignin={this.handleSignin} handleChange={this.handleChange} handleClose={this.handleClose} /> : null
                            }

                            {this.state.signup ? <SignupModal children={children} handleClose={this.handleClose} /> : null
                            }

                            {this.state.renderModal ? <CustomProjectNameModal handleSaveModal={this.handleSaveModal} handleSaveModalClose={this.handleSaveModalClose} handleClose={this.handleClose} code={this.props.code} handlers={this.props.handlers} user={this.props.user} handleModalClose={this.handleModalClose} /> : null}
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
        );
    }
}
