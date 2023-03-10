import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import NavBar from "../components/NavBar";
import SongInfo from "../components/SongInfo";
import StatsCard from "../components/StatsCard";
import Loading from "../components/Loading";
import { extractSong, extractSongStats } from "../helpers/extractData.js"

function Stats() {
  const location = useLocation();
  const [song, setSong] = useState(null);
  const [songStats, setSongStats] = useState(null);

  useEffect(() => {
    // Set songStats on render
    const songID = location.pathname.slice(7);
    
    async function getSongStats(ID) {
      const path = `api/track-stats/${ID}`;
      const url = encodeURI(process.env.REACT_APP_SERVER_URL + path);

      try {
        const response = await fetch(url);
        const song = await response.json();
        const stats = extractSongStats(song);
        setSongStats(stats);
      }
      catch (error) {
        alert(`Error: ${error}`);
      }
    }

    getSongStats(songID);
  }, [location.pathname]);

  useEffect(() => {
    const songID = location.pathname.slice(7);

    if (location.state) {
      setSong(location.state);
    }
    else {
      async function getSong(ID) {
        const path = `api/track/${ID}`;
        const url = encodeURI(process.env.REACT_APP_SERVER_URL + path);
  
        try {
          const response = await fetch(url);
          const song = await response.json();
          const extractedSong = extractSong(song);
          setSong(extractedSong);     
        }
        catch (error) {
          alert(`Error: ${error}`);
        }  
      };

      getSong(songID);
    }
  }, [location.pathname, location.state]);
  

  // Increment song's search count in db
  useEffect(() => {
    if (song) {
      async function addSearch(song) {
        const path = "api/searched-song";
        const url = encodeURI(process.env.REACT_APP_SERVER_URL + path);
        const options = {
          method: "POST",
          mode: "cors",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(song)
        };

        try {
          await fetch(url, options);
        }
        catch (error) {
          alert(`Error: ${error}`);
        }
      }

      addSearch(song);
    }
  }, [song]);

  return (
    <Box >
      <NavBar />
      {song !== null && songStats !== null ? 
        <Box sx={{
          display: "flex",
          justifyContent: "center", 
          maxWidth: true, 
          flexWrap: "wrap",
          textAlign: "center"
        }}
        >
          <SongInfo song={song} stats={songStats} />
          <StatsCard song={song} stats={songStats} />
        </Box>
        : 
        <Loading height={"50vh"}/>}
    </Box>
  );
};

export default Stats;