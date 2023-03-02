import React from "react";
import NavBar from "../components/NavBar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { extractSong, extractSongStats } from "../helpers/extractData.js"
import SongInfo from "../components/SongInfo";
import SongStats from "../components/SongStats";
import Box from '@mui/material/Box';
import PopularityMeter from "../components/PopularityMeter";
import { Stack } from "@mui/material";


function Stats() {
  const location = useLocation();
  const [song, setSong] = useState(null);
  const [songStats, setSongStats] = useState(null);
  const [forceRender, setForceRender] = useState(false);

  function displayInfo() {
    if (song) {
      return <SongInfo song={song}/>;
    }
    else {
      return <h1>Loading...</h1>
    }
  };

  function displayStats() {
    if (songStats) {
      return <SongStats stats={songStats}/>;
    }
    else {
      return <h1>Loading...</h1>
    }
  };

  
  
  
  useEffect(() => {
    // Set songStats on render
    const songID = location.pathname.slice(7);
    
    async function getSongStats(ID) {
      const PATH = `api/track-stats/${ID}`;
      const URL = encodeURI(process.env.REACT_APP_SERVER_URL + PATH);
      const response = await fetch(URL);
      const song = await response.json();
      // data contains data of one song so it must be put into an array to get song object
      const stats = extractSongStats(song);
      setSongStats(stats);
    }

    getSongStats(songID);

    // Set song state if stats page was navigated to though app ui
    if (location.state) {
      setSong(location.state);
    } 

  }, []);

  useEffect(() => {
    /* 
      Only set song state after songStats state set 
      and song state is not already being set

      This prevents bar chart animation from breaking when visiting
      stats page by typing in url. 

      NOTE: navigating to a stats page withg forward button in browser
      still results in broken animation.
    */
    
    if (songStats && !location.state) {
      const songID = location.pathname.slice(7);
      async function getSong(ID) {
        const PATH = `api/track/${ID}`;
        const URL = encodeURI(process.env.REACT_APP_SERVER_URL + PATH);
        const response = await fetch(URL);
        const song = await response.json();
        
        // data contains data of one song so it must be put into an array to get song object
        const extractedSong = extractSong(song);
        setSong(extractedSong);     
        
      };
      
      getSong(songID);
    }
  }, [songStats]);


  //TODO set breakpoints
  return (
    <Box >
      <NavBar />
      <Box sx={{
        display: "flex", 
        justifyContent: "center", 
        maxWidth: true, 
        flexWrap: "wrap",
        mb: 7
      }}
      >
          <SongInfo song={song} stats={songStats}/>
          <Stack 
            spacing={2}
            justifyContent="center"
            alignItems="center"
            mt={5}
          >
            <PopularityMeter value={song ? song.popularity : 0}/>
            <SongStats stats={songStats}/>
          </Stack>
          
      </Box>
    </Box>
      
  
  );
};

//{songStats ? <SongStats stats={songStats}/> : null}
export default Stats;