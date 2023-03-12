import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Fade} from '@mui/material';
import { CircularProgress } from '@mui/material';
import ExplicitIcon from '@mui/icons-material/Explicit';
import InfoTable from './InfoTable';
import Link from '@mui/material/Link';
import PopularityMeter from './PopularityMeter';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import "./SongInfo.css" 
import SongStats from './SongStats';


//TODO fade in

  //TODO click animation to album cover

function SongInfo(props) {
  const [iconID, setIconID] = React.useState("play-icon-desktop");
  React.useEffect(() => {
    /* 
      Set visibility of play button based on if user is
      using a touch screen or not
    */

    // https://stackoverflow.com/a/57995447
    console.log(window.matchMedia("(hover: none)").matches)
    if (window.matchMedia("(hover: none)").matches) {
      // hover unavailable
      setIconID("play-icon-mobile");
    }
    else {
      // Hover available
      setIconID("play-icon-desktop");
    }
  }, []);

  // Removes styles applied after clicking button
  function unFocusButton(event) {
    const button = event.currentTarget;

    if (iconID === "play-icon-desktop") {
      // Delay fade out of play icon after click
      setIconID("play-icon-mobile");
      setTimeout(() => {
        button.blur();
        setIconID("play-icon-desktop");
      }, 200)
    }
    else { 
      // Icon does not fade out on mobile
      setTimeout(() => {
        button.blur();
      }, 200)
    }
  };

  return (
    <Fade in unmountOnExit timeout={350}>
      <Card 
        sx={{ 
          minWidth: 200, 
          maxWidth: 700,
          bgcolor: "#212121",
          mr: 2,
          ml: 2,
          mb: "5vh",
          textAlign:"center",
        }}
      >
        <CardContent>
        <Link 
          href={props.song.playLink}
          display="inline-block"
          id="play-button"
          onClick={unFocusButton}
        >
            <Box 
              id="album-box"
              sx={{ 
                position: 'relative', 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
              }}
            >
              <Avatar
                id="album-cover"
                alt="Cover Art"
                variant="rounded"
                src={props.song.coverArt}
                sx={{ 
                  width: "100%",
                  height: "100%",
                  maxWidth: {xs: "308px", sm: "308px", md: "400px", lg: "450px", xl: "450px"},
                  maxHeight: {xs: "308px", sm: "308px", md: "400px", lg: "450px", xl: "450px"},
                }}
              />
              <PlayCircleIcon 
                id={iconID}
                fontSize="large" 
                sx={{
                  color: "white", 
                  position: 'absolute'
                }}
              />
            </Box>
          </Link>
          <Box 
            sx={{ 
              position: 'relative', 
              display: "flex",
              justifyContent: "center",
              alignIems: "center",
              mt: 2,
              mb: 1, 
            }}
          >
            
            <Typography variant="h4" color="white" 
              sx={{display: "inline", maxWidth: {xs: "300px", sm: "308px", md: "400px", lg: "450px", xl: "450px"}}}//{xs: "350px", sm: "350px", md: "350px", lg: "500px", xl: "550px"}}}
            >
              {props.song.explicit && <ExplicitIcon fontSize="large" sx={{color: "white", pr: 1, top: 4, position: "relative"}}></ExplicitIcon>}
              {props.song.songName}
            </Typography>
          </Box>
          <Box 
            sx={{ 
              position: 'relative', 
              display: "flex",
              justifyContent: "center",
              alignIems: "center",
              mb: 1, 
            }}
          >
            <Typography 
              variant="h5" 
              color="white" 
              sx={{
                textAlign: "center", 
                maxWidth: {xs: "300px", sm: "308px", md: "400px", lg: "450px", xl: "450px"}
                }}
              >
              {props.song.artists.join(" & ")}
            </Typography>
          </Box>
          <Box 
            sx={{ 
              position: 'relative', 
              display: "flex",
              justifyContent: "center",
              alignIems: "center",
              mb: 2, 
            }}
          >
            <Typography 
              variant="h6" 
              color="white" 
              sx={{
                textAlign: "center", 
                maxWidth: {xs: "300px", sm: "308px", md: "400px", lg: "450px", xl: "450px"}
              }}
            >
              {props.song.albumName}
            </Typography>
          </Box>
          <InfoTable song={props.song} stats={props.stats}/>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default SongInfo