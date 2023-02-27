import React from "react";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import ListItemButton from '@mui/material/ListItemButton';
import { NavLink } from "react-router-dom";


function Song(props) {
  console.log(props.song);

  function generateArtistText() {
    let headerText;
    let artistText;

    if (props.song.artists.length === 1) {
      headerText = "Artist: ";
      artistText = props.song.artists[0];
    }
    else {
      headerText = "Artists: ";
      artistText = props.song.artists.join(" & ");
    }

    return headerText + artistText;
  }

  return (
    <NavLink 
      to={`/stats/${props.song.id}`}
      state={props.song}
    >
      <ListItemButton 
        alignItems="flex-start"
      >
        <ListItemAvatar>
          <Avatar alt="Cover Art" src={props.song.coverArt} />
        </ListItemAvatar>
        <ListItemText
          primary={`Song: ${props.song.songName}`}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'block' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {generateArtistText()}
              </Typography>
              {`\n Album: ${props.song.albumName}`}
            </React.Fragment>
          }
        />
      </ListItemButton>
    </NavLink>
  );
};

export default Song;