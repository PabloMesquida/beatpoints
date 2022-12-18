import React, { useState, createContext } from "react";

export const aContext = createContext();

export default function AppContext({ children }) {
  const [playingTrack, setPlayingTrack] = useState();
  const [play, setPlay] = useState(false);
  const [playerRef, setPlayerRef] = useState(false);
  const [artist, setArtist] = useState();

  return (
    <aContext.Provider
      value={{
        playingTrack,
        setPlayingTrack,
        play,
        setPlay,
        playerRef,
        setPlayerRef,
        artist,
        setArtist,
      }}
    >
      {children}
    </aContext.Provider>
  );
}
