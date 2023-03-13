import React from "react";
import { Box, Typography } from "@mui/material";
import NavBar from "../components/NavBar";

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