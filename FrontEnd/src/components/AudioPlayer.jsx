import React from 'react';

function AudioPlayer({ audioURL }) {
  return (
    <audio controls className="w-full mt-2">
      <source src={audioURL} type="audio/mp3" />
      Your browser does not support audio playback.
    </audio>
  );
}

export default AudioPlayer;