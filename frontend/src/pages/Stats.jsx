import React from "react";
import NavBar from "../components/NavBar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { extractSong, extractSongStats } from "../helpers/extractData.js"


function Stats() {
  const location = useLocation();
  const [song, setSong] = useState(null);
  const [songStats, setSongStats] = useState(null);
  
  useEffect(() => {
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

    if (!location.state) {
      /* 
        Fetch song data when user accesses the stats
        page by typing in the path.
      */

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
    else {
      // User accessed stats page through app ui
      setSong(location.state);
    }  

    getSongStats(songID);
  }, []);


  return (
    <div>
      <NavBar />
      <p>{JSON.stringify(song)}</p>
      <p>{JSON.stringify(songStats)}</p>
    </div>
  );
};

export default Stats;