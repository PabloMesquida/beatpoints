import React, { useContext } from "react";
import {
  SongContainer,
  ImgArtistContiner,
  ImgArtist,
  H1Dashboard,
  H2Dashboard,
  Img,
} from "./DataSong.styles.js";
import { aContext } from "../context/Context.js";
import ImgReplace from "./ImgReplace.js";

const DataSong = ({ playingTrack }) => {
  const { artist } = useContext(aContext);

  console.log(playingTrack);

  console.log("ARTIST", artist);
  return (
    <SongContainer>
      <ImgArtistContiner>
        {artist ? (
          <Img>
            <ImgArtist src={playingTrack.albumUrl} alt={artist.name} />
            <H1Dashboard>{playingTrack?.title}</H1Dashboard>
          </Img>
        ) : (
          <ImgReplace />
        )}
      </ImgArtistContiner>

      <H2Dashboard>{playingTrack?.artist}</H2Dashboard>
    </SongContainer>
  );
};

export default DataSong;
