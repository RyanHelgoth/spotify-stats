import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function PopularityMeter(props) {
  return (
    <Box sx={{ position: 'relative', display: "inline-flex"}}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: "white",
        }}
        size={140}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        disableShrink
        sx={{
          color: "#1DB954",
          position: 'absolute',
          left: 0,
        }}
        size={140}
        thickness={4}
        value={props.value}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        >
        <Typography 
          variant="caption" 
          component="div" 
          color="white"
          textAlign="center"
          fontSize={16}
          pl={5}
          pr={5}
        >
          {`Popularity\n${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>

  );
};


export default PopularityMeter;