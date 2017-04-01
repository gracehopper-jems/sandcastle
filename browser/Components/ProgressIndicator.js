import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import { Button, Modal, Tooltip, Popover } from 'react-bootstrap';

const Progress = () => (
    <div>
        <CircularProgress size={15} thickness={2} />
    </div>
);

export const ProgressModal = (props) => (
    <div className="static-modal">
        <Modal.Dialog dialogClassName="custom-modal">
            <Modal.Header>
                <Modal.Title>Building {props.view}...</Modal.Title>
            </Modal.Header>

            <Modal.Body id="progress-modal-body">
                <center>
                <CircularProgress size={200} thickness={10} />
                </center>
            </Modal.Body>
        </Modal.Dialog>
    </div>
);

export default Progress;
