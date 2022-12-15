import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { aContext } from "../context/Context.js";
import ShowLyrics from "./ShowLyrics.js";
import ShowSyncLyrics from "./ShowSyncLyrics.js";

export const Lyrics = () => {
  const [lyrics, setLyrics] = useState("");
  const [syncLyric, setSyncLyric] = useState(false);
  const { playingTrack } = useContext(aContext);

  const URI = process.env.REACT_APP_SERVER_URI;
  // const URI = "http://localhost:3001";

  useEffect(() => {
    if (!playingTrack) return;
    setLyrics("");
    axios
      .get(
        `https://spotify-lyric-api.herokuapp.com/?trackid=${playingTrack.id}`
      )
      .then((res) => {
        console.log(res.data);
        setSyncLyric(!res.data.error);

        if (res.data.error === true || res.data.syncType === "UNSYNCED") {
          console.log("no sync");
          axios
            .get(`${URI}/lyrics`, {
              params: {
                track: playingTrack.title,
                artist: playingTrack.artist,
              },
            })
            .then((res) => {
              console.log("lyrics", res.data.lyrics);
              setLyrics(res.data.lyrics);
            });
        } else {
          setLyrics(res.data.lines);
        }
      });
  }, [playingTrack]);

  return (
    <>
      {lyrics && syncLyric ? (
        <ShowSyncLyrics lyrics={lyrics} />
      ) : (
        <ShowLyrics lyrics={lyrics} />
      )}
    </>
  );
};
