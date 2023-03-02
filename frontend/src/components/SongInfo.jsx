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


//TODO fade in

  //TODO display popularity
  //TODO add play link to avatar

function SongInfo(props) {
  return (
    (props.song !== null && props.stats !== null) ?
    <Card sx={{ minWidth: 275, bgcolor: "#b3b3b3"}}>
      <CardContent>
        <Avatar
          alt="Cover Art"
          variant="rounded"
          src={props.song.coverArt}
          sx={{ width: 300, height: 300}}
        />
        {props.song.explicit && <ExplicitIcon sx={{color: "white"}}></ExplicitIcon>}
        <Typography variant="h4" color="white" sx={{textAlign: "center", display: "inline"}}>
          {props.song.songName}
        </Typography>
        <Typography variant="h5" color="white" sx={{textAlign: "center"}}>
          {props.song.artists.join(" & ")}
        </Typography>
        <Typography variant="h6" color="white" sx={{textAlign: "center", mb: 2}}>
          {props.song.albumName}
        </Typography>
        <InfoTable song={props.song} stats={props.stats}/>
      </CardContent>
      <CardActions>
      <Link href={props.song.playLink}>
        <Button size="small">Play Song!</Button>
      </Link>
      <Link href={props.song.link} target="_blank">
        <Button size="small">Song Page</Button>
      </Link>
      </CardActions>
    </Card>
    : <CircularProgress 
      sx={{color: "#1DB954"}}
      size={60}
    >
    </CircularProgress>
  );
};

export default SongInfo