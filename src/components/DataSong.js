import React, { useContext } from "react";
import {
  SongContainer,
  ImgArtistContiner,
  ImgArtist,
  H1Dashboard,
  H2Dashboard,
  Img,
  ArtistContainer,
  ArtistAvatar,
  InfoContainer,
  InfoAlbumContainer,
  AlbumImg,
  InfoAlbum,
  AlbumName,
  AlbumRelease,
} from "./DataSong.styles.js";
import { aContext } from "../context/Context.js";
import ImgReplace from "./ImgReplace.js";
import Genres from "./Genres.js";

const DataSong = ({ playingTrack }) => {
  const { artist, trackInfo } = useContext(aContext);

  console.log(trackInfo);

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
      {playingTrack && (
        <InfoContainer>
          <ArtistContainer>
            <ArtistAvatar src={artist?.images[artist.images.length - 1].url} />
            <H2Dashboard>{playingTrack?.artist}</H2Dashboard>
          </ArtistContainer>
          {artist && <Genres artist={artist} />}
          {trackInfo && (
            <InfoAlbumContainer>
              <AlbumImg
                src={
                  trackInfo?.album.images[trackInfo.album.images.length - 1].url
                }
              />

              <InfoAlbum>
                <AlbumName>{trackInfo.album.name}</AlbumName>
                <AlbumRelease>
                  {trackInfo.album.release_date.slice(0, 4)}
                </AlbumRelease>
              </InfoAlbum>
            </InfoAlbumContainer>
          )}
        </InfoContainer>
      )}
    </SongContainer>
  );
};

export default DataSong;
