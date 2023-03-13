import React from "react";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import ListItemButton from '@mui/material/ListItemButton';
import { NavLink } from "react-router-dom";
import { generateArtistText } from "../helpers/interpretData";

function Song(props) {

  return (
    <NavLink 
      to={`/stats/${props.song.id}`}
      state={props.song}
      style={{textDecoration: "none"}}
    >
      <ListItemButton 
        alignItems="flex-start"
      >
        <ListItemAvatar>
          <Avatar alt="Cover Art" src={props.song.coverArt} />
        </ListItemAvatar>
        <ListItemText
          sx={{color: "white"}}
          primary={`Song: ${props.song.songName}`}
          secondary={
            <React.Fragment >
              <Typography
                sx={{ display: 'block', color:"white" }}
                component="span"
                variant="body2"
              >
                {generateArtistText(props.song.artists)}
              </Typography>
              <Typography
                sx={{ display: 'block', color:"white"}}
                component="span"
                variant="body2"
              >
                {`\n Album: ${props.song.albumName}`}
              </Typography>
              {typeof props.song.rank !== "undefined"  && <Typography
                sx={{ display: 'block', color:"white"}}
                component="span"
                variant="body2"
              >
                {`\n Ranking: #${props.song.rank}`}
              </Typography>}
            </React.Fragment>  
          }
        />
      </ListItemButton>
    </NavLink>
  );
};

export default Song;