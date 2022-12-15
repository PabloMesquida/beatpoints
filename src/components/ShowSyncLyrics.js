import React, { useState, useEffect, useContext } from "react";
import { aContext } from "../context/Context.js";

const ShowSyncLyrics = ({ lyrics }) => {
  const { play } = useContext(aContext);
  const [count, setCount] = useState(0);
  const [lyric, setLyric] = useState({ l1: "", l2: "", l3: "" });
  const [start] = useState(Date.now());
  const [now, setNow] = useState(start);
  const counter = now - start - 1800;

  let intervalID;
  let line1, line2, line3;

  const update = () => {
    intervalID = setInterval(() => setNow(Date.now()), 10);
    return () => clearInterval(intervalID);
  };

  useEffect(() => {
    if (play) {
      if (
        counter >= Number(lyrics[count].startTimeMs) &&
        count <= lyrics.lenght
      ) {
        line1 = "";
        if (count > 0) {
          line1 = lyrics[count - 1].words;
        }
        line2 = lyrics[count].words;
        line3 = lyrics[count + 1].words
          ? (line3 = lyrics[count + 1].words)
          : (line3 = "");
        setLyric({ l1: line1, l2: line2, l3: line3 });
        setCount((prevCount) => prevCount + 1);
      }
      update();
    }
  }, [counter, play]);

  return (
    <div>
      <h4>{lyric.l1}</h4>
      <h3>{lyric.l2}</h3>
      <h4>{lyric.l3}</h4>
    </div>
  );
};

export default ShowSyncLyrics;
