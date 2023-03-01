import React from 'react'

function SongInfo(props) {
  return (
    <p>{JSON.stringify(props.song)}</p>
  );
};

export default SongInfo