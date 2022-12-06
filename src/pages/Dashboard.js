import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import Search from "../components/Search.js";
import { useAuth } from "../hooks/useAuth.js";
import {
  DashboardContainer,
  UserContainer,
  DataSongContainer,
  DisplayContainer,
} from "./Dashboard.styles.js";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
  // clientId: "eafd5a23f1cb4f02b98c1cda9aa21333",
});

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <DashboardContainer>
      <UserContainer></UserContainer>
      <DataSongContainer></DataSongContainer>
      <DisplayContainer>
        <Search accessToken={accessToken} spotifyApi={spotifyApi} />
      </DisplayContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
