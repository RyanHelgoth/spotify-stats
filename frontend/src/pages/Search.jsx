import React from "react";
import NavBar from "../components/NavBar";
import SearchForm from "../components/SearchForm";
import Box from '@mui/material/Box';
//import Container from '@mui/material/Container';

function Search() {
  return (
    <Box>
      <NavBar />
      <SearchForm />
    </Box>
  );
};

export default Search;
