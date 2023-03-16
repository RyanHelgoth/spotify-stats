import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

function Error(props) {
  return (
    <Box>
      <Dialog
        open={true} 
        PaperProps={{
            sx: {
                position: "absolute",
                top: "20vh",
                bgcolor: "#121212",
                color: "white"
            },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {props.errorTitle}
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description" sx={{color: "white"}}>
            {props.errorDesc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => props.handleClose()} 
            sx={{
                color: "white",
                '&:hover': {
                      backgroundColor: '#b3b3b3',
                      color: '#121212',
                }
            }}
            >
            Ok
        </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Error;