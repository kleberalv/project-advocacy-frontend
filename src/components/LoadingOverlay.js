import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import '../App.css';

const LoadingOverlay = () => {
  return (
    <Grid className="overlay">
      <CircularProgress className="progress" />
    </Grid>
  );
};

export default LoadingOverlay;
