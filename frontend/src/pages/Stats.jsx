import React from "react";
import NavBar from "../components/NavBar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


function Stats() {
  const location = useLocation();
  const [song, setSong] = useState(null);
  const [songStats, setSongStats] = useState(null);
  

  // TODO move to helper function file. import here and in Search.jsx
  function extractSong(data) {
    const song = data.track;
      /* 
        Excluded song duration because it is also included
        in data returned by song audio features spotify api request.
      */
    return {
      id: song.id,
      songName: song.name,
      explicit: song.explicit, 
      popularity: song.popularity,
      link: song.external_urls.spotify,
      playLink: song.uri,
      albumName: song.album.name,
      albumType: song.album.album_type,
      coverArt: song.album.images[0].url, // Large image
      releaseDate: song.album.release_date,
      artists: song.artists.map(artist => artist.name),
      songNumber: song.track_number,
      albumSongAmount: song.album.total_tracks,
      discNumber: song.disc_number
    };  
  };

  function getMusicalKey(keyNum) {
    //TODO Pitch Class notation
    return keyNum;
  };

  function getMusicalMode(modeNum) {
    return modeNum === 1 ? "Major" : "Minor";
  }

  function getTimeSignature(timeSigNum) {
    return `${timeSigNum}/4`;
  }


  function getPercentageString(float) {
    const percentage = (float * 100).toFixed(2);
    return `${percentage}%`;
  }

  function extractSongStats(song) {
    const stats = song.stats;
    return {
      acousticness: stats.acousticness,
      danceability: stats.danceability,
      energy: stats.energy,
      instrumentalness: stats.instrumentalness,
      key: getMusicalKey(stats.key),
      liveness: stats.liveness,
      loudness: stats.loudness,
      mode: getMusicalMode(stats.mode),
      speechiness: stats.speechiness,
      bpm: stats.tempo,
      timeSignature: getTimeSignature(stats.time_signature),
      valence: stats.valence
    };
  };


  
  
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