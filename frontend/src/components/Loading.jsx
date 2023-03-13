import React from "react"
import {Box, CircularProgress} from "@mui/material";

function Loading(props) {
  return (
    <Box 
      height={props.height}
      sx={{textAlign: "center"}}
    >
      <CircularProgress 
        sx={{color: "#1DB954", position: "relative", top: "30%"}}
        size={60}
    	>
    	</CircularProgress>
		</Box>
  );
};

export default Loading;