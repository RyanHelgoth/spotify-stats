import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Fade} from '@mui/material';
import Link from '@mui/material/Link';
import PopularityMeter from './PopularityMeter';
import "./SongInfo.css" 
import SongStats from './SongStats';
import { NavLink } from 'react-router-dom';

function StatsCard(props) {

  return (
    <Fade in unmountOnExit timeout={350}>
      <Card 
        sx={{ 
          width: "340px",
          bgcolor: "#212121",
          mr: 2,
          ml: 2,
          mb: "5vh",
          textAlign:"center",
          display: "flex",
          direction: "column",
          justifyContent: "center",
          alignItems: "center",
          
        }}
      >
        <CardContent >
          <SongStats stats={props.stats} />
          <PopularityMeter value={props.song ? props.song.popularity : 0}/>
          <Typography 
              variant="h5" 
              color="white" 
              sx={{
                textAlign: "center", 
                ml: 2,
                mr: 2
              }}
          >
            Visit the <Link component={NavLink} to="/about" color="#1DB954">about</Link> page for more information on these stats
          </Typography>
        </CardContent>
      </Card>
    </Fade>
  );
};

export default StatsCard;
//<SongStats stats={props.stats} />