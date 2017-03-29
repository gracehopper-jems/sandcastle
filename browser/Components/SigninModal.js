import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SigninModal = (props) => (
    <div className="static-modal">
        <Modal.Dialog>
        <Modal.Header>
            <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <form onSubmit={props.handleSignin}>
                <div className="form-group">
                    <label htmlFor="inlineFormInput">Email address</label>
                    <input name="email" type="text" className="form-control" id="inlineFormInput" placeholder="Enter email" onChange={props.handleChange} autoFocus={focus} />
                </div>
                <div className="form-group">
                    <label htmlFor="inlineFormInputGroup">Password</label>
                    <input name="password" type="password" className="form-control" id="inlineFormInputGroup" placeholder="Password" aria-describedby="passwordHelp" onChange={props.handleChange} />

                </div>
                <button type="submit" className="btn btn-primary">Sign In</button>
            </form>

        </Modal.Body>

        <Modal.Footer>
            <Button onClick={props.handleClose}>Close</Button>
        </Modal.Footer>

        </Modal.Dialog>
    </div>
);

export default SigninModal;
