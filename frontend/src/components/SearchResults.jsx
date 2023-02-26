import React from "react";
import List from '@mui/material/List';
import Song from "./Song";

// List of songs
function SearchResults(props) {

  function displaySongs() {
    return props.songs.map(song => {
        return <Song key={song.id} song={song}></Song>;
    });
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {displaySongs()}
    </List>
  );
};

export default SearchResults;