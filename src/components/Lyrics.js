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
  //const URI = "http://localhost:3001";

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
        setLyrics(res.data.lines);

        if (res.data.error === true || res.data.syncType === "UNSYNCED") {
          console.log("no sync");
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
