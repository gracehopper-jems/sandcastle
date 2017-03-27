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
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Loading {props.view}...</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <center>
        <CircularProgress size={80} thickness={5} />
        </center>
      </Modal.Body>

      <Modal.Footer>
      </Modal.Footer>

    </Modal.Dialog>
  </div>
);
export default Progress;
