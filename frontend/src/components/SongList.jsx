import React from "react";
import List from '@mui/material/List';
import Song from "./Song";
import { Divider, Fade } from "@mui/material";
import { Box } from "@mui/system";

// List of songs
function SongList(props) {

  function displaySongs() {
    const lastSongIndex = props.songs.length - 1;
  
    return props.songs.map((song, index) => {
        return (
            <Box key={song.id}>
              <Song song={song}></Song>
              { // Display dividers between songs 
                index !== lastSongIndex && <Divider sx={{bgcolor: "white"}}></Divider> 
              }
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

export default SongList;