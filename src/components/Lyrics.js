import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { aContext } from "../context/Context.js";
import ShowLyrics from "./ShowLyrics.js";
import ShowSyncLyrics from "./ShowSyncLyrics.js";
import { LiricsContainer } from "./Lyrics.styles.js";

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

        if (res.data.error === true || res.data.syncType === "UNSYNCED") {
          console.log("no sync");
          setSyncLyric(res.data.error);
        } else {
          setLyrics(res.data.lyrics);
        }
      })
      .catch(() => {
        axios
          .get(`${URI}/lyrics`, {
            params: {
              track: playingTrack.title,
              artist: playingTrack.artist,
            },
          })
          .then((res) => {
            setLyrics(res.data.lyrics);
          });
      });
  }, [playingTrack]);

  return (
    <LiricsContainer>
      {lyrics && syncLyric ? (
        <ShowSyncLyrics lyrics={lyrics} />
      ) : (
        <ShowLyrics lyrics={lyrics} />
      )}
    </LiricsContainer>
  );
};
