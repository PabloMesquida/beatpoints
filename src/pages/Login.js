import React from "react";

//const URI = process.env.REACT_APP_REDIRECT_URI;
const URI = "https://beatpoints.vercel.app";

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=eafd5a23f1cb4f02b98c1cda9aa21333&response_type=code&redirect_uri=${URI}&scope=streaming%20user-read-email%20user-read-playback-state%20user-modify-playback-state`;

const Login = () => {
  return (
    <div>
      <a href={AUTH_URL}>Login With Spotify</a>
    </div>
  );
};

export default Login;
