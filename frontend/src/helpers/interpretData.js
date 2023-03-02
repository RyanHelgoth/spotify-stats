
function getModeString(modeNum) {
  return modeNum === 1 ? "Major" : "Minor";
}
  
function getTimeSigString(timeSigNum) {
  return `${timeSigNum}/4`;
}

function getKeyString(keyNum, modeNum) {
  // Using pitch class notation
  // https://en.wikipedia.org/wiki/Pitch_class
  const pitchTable = {
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

function getDateFormat(precision) {
  const dateTable = {
    "year": "Release Year",
    "month": "Release Date (YYYY-MM)",
    "day": "Release Date (YYYY-MM-DD)"
  }

  return dateTable[precision];
}

function formatDuration(duration) {
  // https://stackoverflow.com/a/69590637
  // Duration is in ms

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
  

  

export { getKeyString, getTimeSigString, getDateFormat, formatDuration};