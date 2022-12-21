import React from "react";
import { GenreTag, GenresContainer } from "./Genres.styles.js";

const Genres = ({ artist }) => {
  let tags = [];

  for (let i = 0; i < artist.genres.length; i++) {
    tags.push(<GenreTag key={i}>{artist.genres[i]}</GenreTag>);
  }
  return <GenresContainer>{tags}</GenresContainer>;
};
export default Genres;
