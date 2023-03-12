import React, { useState, useEffect, useContext, useRef } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { aContext } from "../../context/Context.js";
import { useMediaQuery } from "../../hooks/useMediaQuery.js";
import NextTrackDisplay from "./NextTrackDisplay.js";
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
  const { play, setPlay, setPlayerRef, nextTrack, setPlayingTrack } =
    useContext(aContext);
  const [time, setTime] = useState(0);
  const [showNextTrack, setShowNextTrack] = useState(false);
  const [countdown, setCountdown] = useState(20);

  const isDesktop = useMediaQuery("(min-width: 900px)");

  const refPlayer = useRef();

  //let interval, t;
  let counter = now - start;
  let prog = 0;

  // const update = () => {
  //   interval = setInterval(() => setNow(Date.now()), 10);
  //   return () => clearInterval(interval);
  // };

  const update = () => {
    let id = null;
    const frame = () => {
      setNow(Date.now());
      id = requestAnimationFrame(frame);
    };
    id = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(id);
  };

  function waitPlayer() {
    let id = null;
    const frame = () => {
      checkPlayer();
      setTime((time) => time + 1);
      id = requestAnimationFrame(frame);
    };
    id = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(id);
  }

  // function waitPlayer() {
  //   t = setInterval(() => {
  //     checkPlayer();
  //     setTime(time + 1);
  //   }, 1000);

  //   return () => clearInterval(t);
  // }

  function checkPlayer() {
    if (refPlayer.current) {
      if (refPlayer.current.state.status === "READY") {
        setPlayerRef(true);
      } else {
        setPlayerRef(false);
      }

      let dif =
        refPlayer.current.state.track.durationMs -
        refPlayer.current.state.progressMs;
      if (dif < 20000 && refPlayer.current.state.isPlaying) {
        setCountdown((prev) => prev - 1);
        countdown > 1 && setShowNextTrack(true);
      }
    }
  }

  useEffect(() => {
    // countdown === 0 && console.log("SET-FALSE");
    //  countdown === 0 && setShowNextTrack(false);
    if (countdown <= 0) {
      setShowNextTrack(false);
      setCountdown(20);
      setPlayingTrack(nextTrack);
    }
  }, [countdown]);

  useEffect(() => {
    waitPlayer();
  }, []);

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
    setShowNextTrack(false);
    if (trackUri !== undefined) {
      setPlay(false);
    }
  }, [trackUri]);

  if (!accessToken) return null;

  return (
    <PlayerContainer>
      {showNextTrack && (
        <NextTrackDisplay nextTrack={nextTrack} countdown={countdown} />
      )}
      <PlayerDiv>
        <PlayerLogo>
          <LogoImg
            src={
              isDesktop
                ? "img/Spotify_Logo_RGB_White.png"
                : "img/Spotify_Logo_RGB_White_small.png"
            }
            alt="Spotify"
          />
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
            initialVolume={0.3}
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
