import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
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
    <Card 
      sx={{ 
        minWidth: 275, 
        bgcolor: "#b3b3b3"
      }}
    >
      <CardContent>
      <Link href={props.song.playLink}>
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
                width: 300, 
                height: 300
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
            alignItems: "center", 
            justifyContent: "center",
            mt: 2
          }}
        >
          {props.song.explicit && <ExplicitIcon fontSize="large" sx={{color: "white", pr: 0.5}}></ExplicitIcon>}
          <Typography variant="h4" color="white" sx={{textAlign: "center", display: "inline"}}>
            {props.song.songName}
          </Typography>
        </Box>
        <Typography variant="h5" color="white" sx={{textAlign: "center"}}>
          {props.song.artists.join(" & ")}
        </Typography>
        <Typography variant="h6" color="white" sx={{textAlign: "center", mb: 2}}>
          {props.song.albumName}
        </Typography>
        <InfoTable song={props.song} stats={props.stats}/>
      </CardContent>
    </Card>
    : <CircularProgress 
      sx={{color: "#1DB954"}}
      size={60}
    >
    </CircularProgress>
  );
};

export default SongInfo