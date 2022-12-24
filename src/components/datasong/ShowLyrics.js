import React from "react";
import { ShowLyricsContainer } from "./ShowLyrics.styles.js";

const ShowLyrics = ({ lyrics }) => {
  console.log(lyrics);
  return <ShowLyricsContainer>{lyrics}</ShowLyricsContainer>;
};

export default ShowLyrics;
