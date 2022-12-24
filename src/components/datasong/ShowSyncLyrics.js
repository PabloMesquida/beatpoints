import React, { useState, useEffect, useContext, useRef } from "react";
import { aContext } from "../../context/Context.js";
import { ShowSyncLyricsContainer, LyricLine } from "./ShowSyncLyrics.styles.js";
import { useSpring } from "react-spring";

const ShowSyncLyrics = ({ lyrics }) => {
  const { play } = useContext(aContext);
  const [count, setCount] = useState(0);
  const [lyric, setLyric] = useState();
  const [start] = useState(Date.now());
  const [now, setNow] = useState(start);
  const [pos, setPos] = useState(75);
  const [prevLineHeight, setPrevLineHeight] = useState(0);
  const [prePauseTime, setPrePauseTime] = useState(0);
  const [pauseTime, setPauseTime] = useState(0);
  const [pauseTime2, setPauseTime2] = useState(0);
  const [realTime, setRealTime] = useState(0);

  const interval = useRef();
  const intervalPause = useRef();
  let counter = now - start - pauseTime;

  const lineProp = useSpring({
    to: { y: pos },
  });

  const getLineHeight = (id) => {
    let element = document.getElementById(id);
    return element.offsetHeight;
  };

  const hightlightLine = (id) => {
    let element = document.getElementById(id);
    element.style.opacity = 1;
  };

  const setLines = () => {
    setLyric(
      lyrics.map((line) => {
        return (
          <LyricLine
            style={lineProp}
            key={line.startTimeMs}
            id={line.startTimeMs}
          >
            {line.words}
          </LyricLine>
        );
      })
    );
  };

  function checkLines() {
    setRealTime(counter);
    if (count < lyrics.length) {
      let axuCounter =
        prePauseTime <= 1 ? counter - pauseTime : realTime - pauseTime2;
      console.log(axuCounter, pauseTime2);
      if (axuCounter >= Number(lyrics[count].startTimeMs)) {
        hightlightLine(lyrics[count].startTimeMs);
        count === 0
          ? setPos(75)
          : setPos((prevCount) => prevCount - prevLineHeight);
        setPrevLineHeight(getLineHeight(lyrics[count].startTimeMs));
        setCount((prevCount) => prevCount + 1);
      }
    }
  }

  function pauseTimeCounter() {
    if (prePauseTime < 1) {
      let t = Date.now() - start - counter;
      setPauseTime(pauseTime + t);
    } else {
      ///  let t = Date.now() - start - realTime;
      let t = Date.now() - start - realTime;
      setPauseTime2(pauseTime2 + t);
    }
  }

  function update() {
    clearInterval(intervalPause.current);
    interval.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
    return () => clearInterval(interval.current);
  }

  function updatePause() {
    clearInterval(interval.current);
    setPrePauseTime((prevCount) => prevCount + 1);
    intervalPause.current = setInterval(() => {
      pauseTimeCounter();
    }, 10);
    return () => clearInterval(interval.current);
  }

  useEffect(() => {
    play ? update() : updatePause();
  }, [play]);

  useEffect(() => {
    checkLines();
  }, [counter]);

  useEffect(() => {
    lyrics && setLines();
  }, [lyrics]);

  return <ShowSyncLyricsContainer>{lyric}</ShowSyncLyricsContainer>;
};

export default ShowSyncLyrics;
