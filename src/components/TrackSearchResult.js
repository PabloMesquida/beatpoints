import React from "react";
import {
  TrackResultContainer,
  TrackResultAvatar,
  TrackResultInfo,
  TrackResultName,
  TrackResultArtist,
} from "./TrackSearchResult.styles.js";

const TrackSearchResult = ({ track, chooseTrack }) => {
  function handlePlay() {
    chooseTrack(track);
  }

  return (
    <TrackResultContainer onClick={handlePlay}>
      <TrackResultAvatar src={track.albumUrl} />
      <TrackResultInfo>
        <TrackResultName>{track.title}</TrackResultName>
        <TrackResultArtist>{track.artist}</TrackResultArtist>
      </TrackResultInfo>
    </TrackResultContainer>
  );
};

export default TrackSearchResult;
