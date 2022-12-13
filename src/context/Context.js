import React, { useState, createContext } from "react";

export const aContext = createContext();

export default function AppContext({ children }) {
  const [playingTrack, setPlayingTrack] = useState();
  const [play, setPlay] = useState(false);

  return (
    <aContext.Provider
      value={{
        playingTrack,
        setPlayingTrack,
        play,
        setPlay,
      }}
    >
      {children}
    </aContext.Provider>
  );
}
