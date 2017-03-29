import React, {Component} from 'react';
import firebase from 'firebase';
import axios from 'axios';

export default class SignUp extends Component {
	constructor(props){
		super(props)
		this.state = {
			firstname: "",
			lastname: "",
			email: "",
			password: "",
			signedUp: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(event){
		event.preventDefault();
		const {email, password} = this.state;

		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(() => {
				console.log('was able to create user')
				firebase.auth().signInWithEmailAndPassword(email, password)
			})
			.then(() => {
				const user = firebase.auth().currentUser;
				const userId = user.uid;
				this.props.handlers.handleSignin(userId);

				axios.post('/setUser', { userId: userId })
					.then(() => {
						console.log('posting userid and setting local state.signedup to true');
						this.setState({ signedUp: true });
					})
					.catch(console.error);
			})
			.catch(err => alert("Invalid sign up!"));
    // .catch(console.error)
  }

	handleChange(event){
		const value = event.target.value;
		const name = event.target.name;
		this.setState({ [name]: value });
	}

	render(){
		return (
			<div>
				{ this.state.signedUp ?

					(<div>
						<div>Thanks for signing up! You are now logged in and can create your first project...BUT! We recommend taking a tour before you do that...
						</div>
					</div>
					)
					: ( <div className="container-fluid">
						<div className="row">
							<form>
								<div className="form-group">
									<label htmlFor="title" className="col-sm-4 control-label">First Name</label>
									<div className="col-sm-6">
										<input name="firstname" type="text" className="form-control" onChange={this.handleChange}  autoFocus={focus} />
									</div>
								</div>
								<div className="form-group">
									<label htmlFor="title" className="col-sm-4 control-label">Last Name</label>
									<div className="col-sm-6">
										<input name="lastname" type="text" className="form-control" onChange={this.handleChange} />
									</div>
								</div>
								<div className="form-group">
									<label htmlFor="title" className="col-sm-4 control-label">Email</label>
									<div className="col-sm-6">
										<input name="email" type="text" className="form-control" onChange={this.handleChange} />
									</div>
								</div>
								<div className="form-group">
									<label htmlFor="title" className="col-sm-4 control-label">Password</label>
									<div className="col-sm-6">
										<input name="password" type="password" className="form-control" onChange={this.handleChange} />
									</div>
								</div>

								<div className="col-sm-offset-10 col-sm-10">
									<button onClick={this.handleSubmit} type="submit" className="btn btn-primary">Submit</button>
								</div>
							</form>
						</div>
						</div>
					)
				}
			</div>
			)
	}
}
