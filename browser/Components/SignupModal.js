import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SignupModal = (props) => (
    <div className="static-modal">
        <Modal.Dialog>
        <Modal.Header>
            <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {props.children}
        </Modal.Body>

        <Modal.Footer>
            <Button onClick={props.handleClose}>Close</Button>
        </Modal.Footer>

        </Modal.Dialog>
    </div>
);

export default SignupModal;
