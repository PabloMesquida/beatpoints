import React, { useState, createContext } from "react";

export const aContext = createContext();

export default function AppContext({ children }) {
  const [playingTrack, setPlayingTrack] = useState();
  const [trackInfo, setTrackInfo] = useState();
  const [play, setPlay] = useState(false);
  const [playerRef, setPlayerRef] = useState(false);
  const [artist, setArtist] = useState();
  const [nextTrack, setNextTrack] = useState();
  const [tiempoAcumulado, setTiempoAcumulado] = useState();

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
        trackInfo,
        setTrackInfo,
        nextTrack,
        setNextTrack,
        tiempoAcumulado,
        setTiempoAcumulado,
      }}
    >
      {children}
    </aContext.Provider>
  );
}
