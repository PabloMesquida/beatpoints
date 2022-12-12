import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { aContext } from "../context/Context.js";

export const Lyrics = () => {
  const [lyrics, setLyrics] = useState("");
  const { playingTrack } = useContext(aContext);

  const URI = process.env.REACT_APP_SERVER_URI;
  //const URI = "http://localhost:3001";

  useEffect(() => {
    if (!playingTrack) return;
    setLyrics("");
    axios
      .get(`${URI}/lyrics`, {
        params: {
          track: playingTrack.title,
          title: playingTrack.title,
          trackId: playingTrack.id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  return <div>{lyrics}</div>;
};
