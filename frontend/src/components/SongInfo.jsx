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
  return (
    (props.song !== null && props.stats !== null) ?
    <Fade in unmountOnExit timeout={350}>
      <Card 
        sx={{ 
          minWidth: 200, 
          maxWidth: 700,
          bgcolor: "#212121",
          mr: 2,
          ml: 2,
          mb: 7,
          textAlign:"center",
        }}
      >
        <CardContent>
        <Link 
          href={props.song.playLink}
          display="inline-block"
        >
            <Box 
              id="album-box"
              sx={{ 
                position: 'relative', 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                //width: {xs: "300px", md: "400px", lg: "500px", xl: "600px"},
                //height: {xs: "300px", md: "400px", lg: "500px", xl: "600px"}
              }}
            >
              <Avatar
                id="album-cover"
                alt="Cover Art"
                variant="rounded"
                src={props.song.coverArt}
                sx={{ 
                  width: {xs: "260px", sm: "400px", md: "450px", lg: "450px", xl: "450px"},
                  height: {xs: "260px", sm: "400px", md: "450px", lg: "450px", xl: "450px"},
                }}
              />
              <PlayCircleIcon 
                id="play-icon"
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
              sx={{display: "inline", maxWidth: {xs: "260px", sm: "400px", md: "450px", lg: "450px", xl: "450px"}}}//{xs: "350px", sm: "350px", md: "350px", lg: "500px", xl: "550px"}}}
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
                maxWidth: {xs: "260px", sm: "400px", md: "450px", lg: "450px", xl: "450px"}
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
                maxWidth: {xs: "260px", sm: "400px", md: "450px", lg: "450px", xl: "450px"}
              }}
            >
              {props.song.albumName}
            </Typography>
          </Box>
          <InfoTable song={props.song} stats={props.stats}/>
        </CardContent>
      </Card>
    </Fade>
    : <CircularProgress 
      sx={{color: "#1DB954"}}
      size={60}
    >
    </CircularProgress>
  );
};

export default SongInfo