import React from "react";
import { LoginContainer, H1, ABtn } from "./Login.styles.js";

// const URI = "http://localhost:3000";
const URI = "https://beatpoints.vercel.app";

const clientId = process.env.REACT_APP_CLIENT_ID;
// const clientId= "eafd5a23f1cb4f02b98c1cda9aa21333";

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${URI}&scope=streaming%20user-read-email%20user-read-playback-state%20user-modify-playback-state`;

const Login = () => {
  return (
    <LoginContainer>
      <H1>beatpoints.</H1>
      <ABtn href={AUTH_URL}>Login with Spotify</ABtn>
    </LoginContainer>
  );
};

export default Login;
