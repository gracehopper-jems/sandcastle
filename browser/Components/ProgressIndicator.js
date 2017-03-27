import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

const Progress = () => (
  <div>
    <CircularProgress size={15} thickness={2} />
  </div>
);

export default Progress;
