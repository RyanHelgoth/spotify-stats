import React from "react";
import Box from '@mui/material/Box';
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";

function Search() {
  const [songs, setSongs] = React.useState([]);

  function getSongs(query) {
    const PATH = "api/tracks";
    const URL = encodeURI(process.env.REACT_APP_SERVER_URL + PATH + "?track-name=" + query);
    fetch(URL)
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
      });
  };

  return (
    <Box sx={{textAlign: "center"}}>
      <NavBar />
      <SearchBar onSearch={getSongs}/>
      <SearchResults />
    </Box>
  );
};

export default Search;
