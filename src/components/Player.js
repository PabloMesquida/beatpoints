import React, { useEffect, useContext } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { aContext } from "../context/Context.js";

const Player = ({ accessToken, trackUri }) => {
  const { play, setPlay } = useContext(aContext);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!accessToken) return null;

  return (
    <SpotifyPlayer
      token={accessToken}
      uris={trackUri ? [trackUri] : []}
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      initialVolume={0.2}
      showSaveIcon
    />
  );
};

export default Player;
