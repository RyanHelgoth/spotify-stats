import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import NavBar from "../components/NavBar";
import SongInfoCard from "../components/SongInfoCard";
import StatsCard from "../components/StatsCard";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { extractSong, extractSongStats } from "../helpers/extractData.js"

function Stats() {
  const location = useLocation();
  const [song, setSong] = useState(null);
  const [songStats, setSongStats] = useState(null);
  const [error, setError] = React.useState({error: false, title: null, desc: null});

  function handleErrorClose() {
    setError({error: false, title: null, desc: null});
  };

  useEffect(() => {
    // Set songStats on render
    const songID = location.pathname.slice(7);
    
    async function getSongStats(ID) {
      const path = `/api/track-stats/${ID}`;
      const url = encodeURI(path);

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          const stats = extractSongStats(data.stats);
          setSongStats(stats);
        }
        else {
          const title = `${data.status} Error: ${data.error.error}`;
          const desc = `Error Description: ${data.error.error_description}`;
          setError({error: true, title: title, desc: desc});
        }
      }
      catch (error) {
        const title = "Error";
        const desc = `Error Description: ${error}`;
        setError({error: true, title: title, desc: desc});
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
        const path = `/api/track/${ID}`;
        const url = encodeURI(path);
  
        try {
          const response = await fetch(url);
          const data = await response.json();
          if (response.ok) {
            const extractedSong = extractSong(data.song);
            setSong(extractedSong);   
          }
          else {
            const title = `${data.status} Error: ${data.error.error}`;
            const desc = `Error Description: ${data.error.error_description}`;
            setError({error: true, title: title, desc: desc});
          }  
        }
        catch (error) {
          const title = "Error";
          const desc = `Error Description: ${error}`;
          setError({error: true, title: title, desc: desc});
        }  
      };

      getSong(songID);
    }
  }, [location.pathname, location.state]);
  

  // Increment song's view count in db
  useEffect(() => {
    if (song) {
      async function addSearch(song) {
        const path = "/api/viewed-song";
        const url = encodeURI(path);
        const options = {
          method: "POST",
          mode: "same-origin",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(song)
        };

        try {
          /* 
            Console logging error instead of alerting because there is 
            no point in bugging the user with an error message when the error
            doesn't effect their use of the website.
          */
          const response = await fetch(url, options);
          const data = await response.json();
          if (!response.ok) {
            console.log(`${data.status} Error (Top Songs Update Error): ${data.error.error}\n` +
            `Error Description: ${data.error.error_description}`);
          }
        }
        catch (error) {
          console.log(`Top Songs Update Error: ${error}`);
        }
      }

      addSearch(song);
    }
  }, [song]);

  return (
    <Box >
      <NavBar />
      {error.error && 
        <Error 
          errorTitle={error.title} 
          errorDesc={error.desc} 
          handleClose={handleErrorClose}

        />
      }
      {song !== null && songStats !== null ? 
        <Box sx={{
          display: "flex",
          justifyContent: "center", 
          maxWidth: true, 
          flexWrap: "wrap",
          textAlign: "center"
        }}
        >
          <SongInfoCard song={song} stats={songStats} />
          <StatsCard song={song} stats={songStats} />
        </Box>
        : 
        <Loading height={"50vh"}/>}
    </Box>
  );
};

export default Stats;