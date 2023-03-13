import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function PopularityMeter(props) {
  
  return (
    <Box 
      sx={{ 
        position: 'relative', 
        display: "inline-flex", 
        mt: 5,
        mb: 10
      }}
    >
      <CircularProgress
        variant="determinate"
        sx={{
          color: "white",
        }}
        size={250}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        sx={{
          color: "#1DB954",
          position: 'absolute',
          left: 0,
          "& 	.MuiCircularProgress-root": {
            animationDuration: "8s"
          },
        }}
        size={250}
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
          justifyContent: 'center'
        }}
      >
        <Typography 
          variant="caption" 
          component="div" 
          color="white"
          textAlign="center"
          fontSize={24}
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