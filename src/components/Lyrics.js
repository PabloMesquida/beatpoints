import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { aContext } from "../context/Context.js";

export const Lyrics = () => {
  const [lyrics, setLyrics] = useState("");
  const { playingTrack } = useContext(aContext);

  useEffect(() => {
    if (!playingTrack) return;
    setLyrics("");
    axios
      .get("http://localhost:3001/lyrics", {
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
