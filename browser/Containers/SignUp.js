import React, {Component} from 'react'; 
import firebase from 'firebase';

export default class SignUp extends Component {
	constructor(props){
		super(props)
		this.state = {
			firstname: "",
			lastname: "", 
			email: "", 
			password: "" 
		}; 
		this.handleSubmit = this.handleSubmit.bind(this); 
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(event){
		event.preventDefault(); 
		const email = this.state.email; 
		const password = this.state.password; 
		console.log("FIREBASE AUTH", firebase.auth());  
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.catch(console.error) 
	};

	handleChange(event){
		const value = event.target.value; 
		const name = event.target.name; 
		this.setState({ [name]: value })
	}

	render(){

			return (
			<div> 
		        <h3>Sign Up</h3>
		        <hr/>
		        <form onSubmit={this.handleSubmit} >
		            <div className="form-group">
		                <label htmlFor="title" className="col-sm-2 control-label">First Name</label>
		                <div className="col-sm-10">
		                    <input name="firstname" type="text" className="form-control" onChange={this.handleChange} />
		                </div>
		            </div>
		          	<div className="form-group">
		                <label htmlFor="title" className="col-sm-2 control-label">Last Name</label>
		                <div className="col-sm-10">
		                    <input name="lastname" type="text" className="form-control" onChange={this.handleChange} />
		                </div>
		            </div>
		            <div className="form-group">
		                <label htmlFor="title" className="col-sm-2 control-label">Email</label>
		                <div className="col-sm-10">
		                    <input name="email" type="text" className="form-control" onChange={this.handleChange} />
		                </div>
		            </div>
		          	<div className="form-group">
		                <label htmlFor="title" className="col-sm-2 control-label">Password</label>
		                <div className="col-sm-10">
		                    <input name="password" type="text" className="form-control" onChange={this.handleChange} />
		                </div>
		            </div>

		            <div className="col-sm-offset-2 col-sm-10">
		                <button type="submit" className="btn btn-primary">Sign Up</button>
		            </div>
		        </form>
		    </div> 
		)


	}


}