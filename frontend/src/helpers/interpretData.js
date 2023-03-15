// Returns mode of song based on number returned by api.
function getModeString(modeNum) {
  return modeNum === 1 ? "Major" : "Minor";
}
  
// Generates time signature string.
function getTimeSigString(timeSigNum) {
  return `${timeSigNum}/4`;
}

// Generates key string based on numbers provided by api.
function getKeyString(keyNum, modeNum) {
  // Convert using pitch class notation
  // https://en.wikipedia.org/wiki/Pitch_class
  const pitchTable = {
    "-1": "(Unknown Key)",
    "0": "C",
    "1": "C#",
    "2": "D",
    "3": "D#",
    "4": "E",
    "5": "F",
    "6": "F#",
    "7": "G",
    "8": "G#",
    "9": "A",
    "10": "A#",
    "11": "B",
  };

  const key = pitchTable[keyNum.toString()];
  const mode = getModeString(modeNum);

  return `${key} ${mode}`;
};

/* 
  Sets format of date string depending on the song's 
  release date precision provided by the api.
*/
function getDateFormat(precision) {
  const dateTable = {
    "year": "Release Year",
    "month": "Release Date (Y-M)",
    "day": "Release Date (Y-M-D)"
  }

  return dateTable[precision];
}

/* 
  Generates a song duration string from song duration given in miliseconds.
  Format is consistent with spotify's duration formating.
*/
function formatDuration(duration) {
  // https://stackoverflow.com/a/69590637
  
  // 1- Convert to seconds:
  let seconds = duration / 1000;

  // 2- Extract hours:
  let hours = parseInt(seconds / 3600); // 3600 seconds in 1 hour
  seconds = parseInt(seconds % 3600); // extract the remaining seconds after extracting hours

  // 3- Extract minutes:
  let minutes = parseInt(seconds / 60); // 60 seconds in 1 minute

  // 4- Keep only seconds not extracted to minutes:
  seconds = parseInt(seconds % 60);

  // 5 - Format so it shows a leading zero if needed
  let hoursStr = ("00" + hours).slice(-2);
  let minutesStr = ("00" + minutes).slice(-2);
  let secondsStr = ("00" + seconds).slice(-2);

  // Construct string
  let durationString = "";
  if (hours !== 0) {
    durationString += hoursStr + ":" 
  }
  if (minutes !== 0) {
    durationString += minutesStr + ":"
    // Get rid of leading 0 unless song is under a minute
    if (durationString[0] === "0") {
      durationString = durationString.slice(1);
    }
  } else {
    durationString += "0:"
  }
  durationString += secondsStr;

  return durationString;
}

/*
  Sorts songs from most viewses to least viewss 
  and gives each song a rank based on their position
  after sorting.
*/
function rankTopSongs(songs) {
  // Using spread to return new array
  const sortedSongs = [...songs].sort((lSong, rSong) => {
    return rSong.views - lSong.views;
  });

  const rankedSongs = sortedSongs.map((song, index) => {
    song.rank = index + 1;
    return song;
  });

  return rankedSongs;
}

// Generates string including appropriate header and list of artists.
function generateArtistText(artists) {
  let headerText;
  let artistText;

  if (artists.length === 1) {
    headerText = "Artist: ";
  }
  else {
    headerText = "Artists: ";
  }

  artistText = artists.join(" & ");
  return headerText + artistText;
}
  
export { getKeyString, getTimeSigString, getDateFormat, formatDuration, rankTopSongs, generateArtistText};