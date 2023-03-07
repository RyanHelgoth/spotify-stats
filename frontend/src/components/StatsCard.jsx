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

function StatsCard(props) {
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
          display: "flex",
          direction: "column",
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        <CardContent >
            <SongStats stats={props.stats}/>
            <PopularityMeter value={props.song ? props.song.popularity : 0}/>
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

export default StatsCard;