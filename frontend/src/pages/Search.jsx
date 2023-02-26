import React from "react";
import Box from '@mui/material/Box';
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";

function Search() {
  const [songs, setSongs] = React.useState([]);

  function extractSongs(data) {
    const extractedSongs = data.tracks.map(song => {
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
    });

    return extractedSongs;
  };

  async function getSongs(query) {
    const PATH = "api/tracks";
    const URL = encodeURI(process.env.REACT_APP_SERVER_URL + PATH + "?track-name=" + query);
    const response = await fetch(URL);
    const data = await response.json();
    const extractedSongs = extractSongs(data);
    setSongs(extractedSongs);
  };

 
  return (
    <Box sx={{textAlign: "center"}}>
      <NavBar />
      <SearchBar onSearch={getSongs}/>
      <SearchResults songs={songs}/>
    </Box>
  );
};

export default Search;
