import React, { useState, createContext } from "react";

export const aContext = createContext();

export default function AppContext({ children }) {
  const [playingTrack, setPlayingTrack] = useState();
  return (
    <aContext.Provider
      value={{
        playingTrack,
        setPlayingTrack,
      }}
    >
      {children}
    </aContext.Provider>
  );
}
