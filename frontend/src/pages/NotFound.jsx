import React from "react";
import NavBar from "../components/NavBar";
import { Box, Typography } from "@mui/material";
function NotFound() {
  return (
    <Box>
      <NavBar />
      <Box textAlign="center" mr={2} ml={2}>
        <Typography variant="h4" color="white">
          Error: 404 Page Not Found :( 
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFound;