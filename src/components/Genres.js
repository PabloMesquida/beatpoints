import React from "react";
import { GenreTag } from "./Genres.styles.js";

const Genres = ({ artist }) => {
  let tags = [];

  for (let i = 0; i < artist.genres.length; i++) {
    tags.push(<GenreTag key={i}>{artist.genres[i]}</GenreTag>);
  }
  return <>{tags}</>;
};
export default Genres;
