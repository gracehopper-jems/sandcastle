import React from 'react';

const NavbarSignIn = (props) => {
    return (
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
    )
}
