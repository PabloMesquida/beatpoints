import React, { useState, useEffect, useContext, useRef } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { aContext } from "../context/Context.js";
import {
  PlayerContainer,
  PlayerDiv,
  PlayerLogo,
  LogoImg,
  PlayContainer,
} from "./Player.styles.js";

const Player = ({ accessToken, trackUri }) => {
  const [start] = useState(Date.now());
  const [now, setNow] = useState(start);
  const [clickPlay, setClickPlay] = useState(false);
  const { play, setPlay, setPlayerRef } = useContext(aContext);
  const [time, setTime] = useState(0);

  const refPlayer = useRef();

  let interval, t;
  let counter = now - start;
  let prog = 0;

  const update = () => {
    interval = setInterval(() => setNow(Date.now()), 10);
    return () => clearInterval(interval);
  };

  const waitPlayer = () => {
    t = setInterval(() => {
      if (refPlayer.current) {
        if (refPlayer.current.state.status === "READY") {
          setPlayerRef(true);
        } else {
          setPlayerRef(false);
        }
      }
      setTime(1);
    }, 1000);
    return () => clearInterval(t);
  };

  useEffect(() => {
    waitPlayer();
  }, [time]);

  useEffect(() => {
    if (clickPlay && !play && refPlayer.current) {
      if (prog < refPlayer.current.state.progressMs) {
        setPlay(true);
      }
      prog = refPlayer.current.state.progressMs;
      update();
    }
  }, [counter, clickPlay]);

  useEffect(() => {
    setClickPlay(true);
    if (trackUri !== undefined) {
      setPlay(false);
    }
  }, [trackUri]);

  if (!accessToken) return null;

  return (
    <PlayerContainer>
      <PlayerDiv>
        <PlayerLogo>
          <LogoImg src="img/Spotify_Logo_RGB_White.png" alt="Spotify" />
        </PlayerLogo>
        <PlayContainer>
          <SpotifyPlayer
            ref={refPlayer}
            token={accessToken}
            uris={trackUri ? [trackUri] : []}
            callback={(state) => {
              if (!state.isPlaying) {
                setClickPlay(false);
                setPlay(false);
              } else {
                setClickPlay(true);
                //  setPlay(true);
              }
            }}
            play={clickPlay}
            initialVolume={0.2}
            syncExternalDevice={false}
            styles={{
              activeColor: "#fff",
              color: "#fff",
              loaderColor: "#fff",
              trackArtistColor: "#ccc",
              trackNameColor: "#fff",
              sliderHeight: "0",
              bgColor: "#00394d",
            }}
            showSaveIcon
          />
        </PlayContainer>
      </PlayerDiv>
    </PlayerContainer>
  );
};

export default Player;
