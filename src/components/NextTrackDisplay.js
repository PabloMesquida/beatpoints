import React from "react";
import {
  NextArtistTxt,
  NextTrackContainer,
  NextTrackTxt,
  NextCounter,
} from "./NextTrackDisplay.styles.js";

const NextTrackDisplay = ({ nextTrack, countdown }) => {
  return (
    <NextTrackContainer>
      Next Song: <NextTrackTxt>{nextTrack.name}</NextTrackTxt> -
      <NextArtistTxt>{nextTrack.artists[0].name}</NextArtistTxt>{" "}
      <NextCounter>{countdown}</NextCounter>
    </NextTrackContainer>
  );
};

export default NextTrackDisplay;
