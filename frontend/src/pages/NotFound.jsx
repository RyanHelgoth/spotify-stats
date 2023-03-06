import React from "react";
import NavBar from "../components/NavBar";
import { Box, Typography } from "@mui/material";
function NotFound() {
  return (
    <Box textAlign="center">
      <NavBar />
      <Typography variant="h4" color="white">
        Error: 404 Page Not Found :( 
      </Typography>
    </Box>
  );
};

export default NotFound;