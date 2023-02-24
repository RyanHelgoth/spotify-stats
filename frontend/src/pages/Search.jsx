import React from "react";
import Box from '@mui/material/Box';
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";

function Search() {
  return (
    <Box sx={{textAlign: "center"}}>
      <NavBar />
      <SearchBar />
      <SearchResults />
    </Box>
  );
};

export default Search;
