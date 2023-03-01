import React from "react";
import List from '@mui/material/List';
import Song from "./Song";
import { Divider } from "@mui/material";
import { Box } from "@mui/system";

// List of songs
function SearchResults(props) {

  function displaySongs() {
    const lastSongIndex = props.songs.length - 1;
    return props.songs.map((song, index) => {
        return (
          <Box>
            <Song key={song.id} song={song}></Song>
            {index !== lastSongIndex && <Divider sx={{bgcolor: "#535353"}}></Divider>}
          </Box>);
    });
  };

  return (
    props.songs.length !== 0 && <List sx={{ 
      borderRadius: "5px",
      width: {xs: "80%", sm: "60%", md: "50%", lg: "40%", xl: "40%"}, 
      bgcolor: "#b3b3b3"
      }}
    > 
      {displaySongs()}
    </List>
  );
};

export default SearchResults;