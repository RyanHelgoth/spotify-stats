import React from "react";
import Box from '@mui/material/Box';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

function Song(props) {
  return (
    <Box >
        <Button>
            <Avatar alt="Artist Image" src={props.artistImg} />
            <span>Song: {props.songName}</span>
            <span>Artist: {props.artistName}</span>
            <span>Album: {props.albumName}</span>
        </Button>
    </Box>
  );
};

export default Song;