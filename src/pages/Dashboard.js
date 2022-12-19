import React, { useEffect, useContext } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import Search from "../components/Search.js";
import UserData from "../components/UserData.js";
import Player from "../components/Player.js";
import { useAuth } from "../hooks/useAuth.js";
import {
  DashboardContainer,
  UserContainer,
  DataSongContainer,
  DisplayContainer,
  DataSec1,
  DataSec2,
} from "./Dashboard.styles.js";
import { aContext } from "../context/Context.js";
import { Lyrics } from "../components/Lyrics.js";
import Display from "../components/Display.js";
import LoaderPage from "./LoaderPage.js";
import DataSong from "../components/DataSong.js";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
  //clientId: "eafd5a23f1cb4f02b98c1cda9aa21333",
});

const Dashboard = ({ code }) => {
  const { playingTrack, playerRef } = useContext(aContext);
  const accessToken = useAuth(code);

  let isPlayer = playerRef;

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <DashboardContainer>
      {!isPlayer && <LoaderPage />}
      <DataSongContainer>
        <DataSec1>
          <DataSong playingTrack={playingTrack} />
        </DataSec1>
        <DataSec2>
          <Lyrics />
        </DataSec2>
      </DataSongContainer>
      <DisplayContainer>
        <Display spotifyApi={spotifyApi} track={playingTrack} />
        <Search accessToken={accessToken} spotifyApi={spotifyApi} />
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </DisplayContainer>
      <UserContainer>
        <UserData accessToken={accessToken} spotifyApi={spotifyApi} />
      </UserContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
