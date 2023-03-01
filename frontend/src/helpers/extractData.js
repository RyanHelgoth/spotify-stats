
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


function extractSong(data) {
  const song = data.track;
    /* 
      -Excluded song duration because it is also included
      in data returned by song audio features spotify api request.

      -Left out genres because api no longer support getting genres.
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


  function extractSongs(data) {
    console.log(data);
    const extractedSongs = data.tracks.map(song => {
      /* 
        Excluded song duration because it is also included
        in data returned by song audio features spotify api request.

        -Left out genres because api no longer support getting genres.
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


  function extractSongStats(song) {
    const stats = song.stats;
    return {
      acousticness: stats.acousticness,
      danceability: stats.danceability,
      energy: stats.energy,
      instrumentalness: stats.instrumentalness,
      key: stats.key,
      liveness: stats.liveness,
      loudness: stats.loudness,
      mode: stats.mode,
      speechiness: stats.speechiness,
      bpm: stats.tempo,
      timeSignature: stats.time_signature,
      valence: stats.valence
    };
  };

export { extractSong, extractSongs, extractSongStats };