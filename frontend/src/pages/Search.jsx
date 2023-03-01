import React from "react";
import Box from '@mui/material/Box';
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { extractSongs } from "../helpers/extractData.js"
import { Stack } from "@mui/system";

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
    <Stack 
      width="100%" 
      spacing={4} 
      alignItems="center"
      mb="7%"
      >
      <NavBar />
      <SearchBar onSearch={getSongs}/>
      <SearchResults songs={songs}/>
    </Stack>
  );
};

export default Search;
