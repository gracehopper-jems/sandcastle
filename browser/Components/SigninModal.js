import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SigninModal = (props) => (
    <div className="static-modal">
        <Modal.Dialog>
        <Modal.Header>
            <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <form onSubmit={props.handleSignin} >
                <label className="sr-only" htmlFor="inlineFormInput">Email</label>
                <input name="email" type="text" className="form-control mb-2 mr-sm-2 mb-sm-0" id="inlineFormInput" placeholder="Email" onChange={props.handleChange} />
                <label className="sr-only" htmlFor="inlineFormInputGroup">Password</label>
                    <input name="password" type="password" className="form-control" id="inlineFormInputGroup" placeholder="Password" onChange={props.handleChange} />
            </form>
        </Modal.Body>

        <Modal.Footer>
            <button type="submit" className="btn btn-primary" onClick={props.handleSignin}>Sign In</button>
            <Button onClick={props.handleClose}>Close</Button>
        </Modal.Footer>

        </Modal.Dialog>
    </div>
);

export default SigninModal;
