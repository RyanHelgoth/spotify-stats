import React from "react";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { extractSongs } from "../helpers/extractData.js"
import { Stack } from "@mui/system";
import { Pagination } from "@mui/material";

function Search() {
  const [songs, setSongs] = React.useState([]);
  const [displayIndices, setDisplayIndices] = React.useState([0, 5]);

  async function getSongs(query) {
    const PATH = "api/tracks";
    const URL = encodeURI(process.env.REACT_APP_SERVER_URL + PATH + "?track-name=" + query);
    const response = await fetch(URL);
    const data = await response.json();
    const extractedSongs = extractSongs(data);
    setSongs(extractedSongs);
  };

  function handlePageChange(event, page) {
    console.log(page)
    const start = (page - 1) * 5;
    const end = page * 5;
    const indicies = [start, end];
    setDisplayIndices(indicies);
    console.log(indicies)
  }
 
  return (
    <Stack 
      width="100%" 
      spacing={4} 
      alignItems="center"
      mb="7%"
      >
      <NavBar />
      <SearchBar onSearch={getSongs}/>
      <SearchResults songs={songs.slice(displayIndices[0], displayIndices[1])}/>
      {songs.length !== 0 && 
        <Pagination 
          count={10} 
          variant="outlined"
          onChange={handlePageChange}
        />
      }
    </Stack>
  );
};

export default Search;
