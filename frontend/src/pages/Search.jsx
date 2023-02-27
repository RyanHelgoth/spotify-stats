import React from "react";
import Box from '@mui/material/Box';
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { extractSongs } from "../helpers/extractData.js"

function Search() {
  const [songs, setSongs] = React.useState([]);

  async function getSongs(query) {
    const PATH = "api/tracks";
    const URL = encodeURI(process.env.REACT_APP_SERVER_URL + PATH + "?track-name=" + query);
    const response = await fetch(URL);
    const data = await response.json();
    const extractedSongs = extractSongs(data);
    setSongs(extractedSongs);
  };

 
  return (
    <Box sx={{textAlign: "center"}}>
      <NavBar />
      <SearchBar onSearch={getSongs}/>
      <SearchResults songs={songs}/>
    </Box>
  );
};

export default Search;
