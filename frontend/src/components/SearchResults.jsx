import React from "react";
import List from '@mui/material/List';
import Song from "./Song";
import { Collapse, Divider, Fade, Grow, Slide, Zoom } from "@mui/material";
import { Box } from "@mui/system";
import { TransitionGroup } from 'react-transition-group';


// List of songs
function SearchResults(props) {

  function displaySongs() {
    const lastSongIndex = props.songs.length - 1;
    console.log(props.songs);
    return props.songs.map((song, index) => {
        return (
            <Box>
              <Song key={song.id} song={song}></Song>
              {index !== lastSongIndex && <Divider sx={{bgcolor: "white"}}></Divider>}
            </Box>
        );
    });
  };

  return (
    // https://stackoverflow.com/a/61660369
    (props.songs.length !== 0) && 
    <Fade in unmountOnExit timeout={350}>
      <List sx={{ 
        borderRadius: "4px",
        width: {xs: "80%", sm: "60%", md: "50%", lg: "40%", xl: "40%"}, 
        bgcolor: "#212121"
        }}
      > 
        {displaySongs()}
      </List>
    </Fade>
  );
};

export default SearchResults;