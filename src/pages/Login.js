import React, { useEffect } from "react";
import LoaderPage from "./LoaderPage.js";
import {
  LoginContainer,
  H1,
  ABtn,
  LoginBtn,
  Advice,
  LinkPremium,
  LinkFooter,
  Footer,
} from "./Login.styles.js";

//const URI = "http://localhost:3000";
const URI = "https://beatpoints.vercel.app";

const clientId = process.env.REACT_APP_CLIENT_ID;
//const clientId = "eafd5a23f1cb4f02b98c1cda9aa21333";

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${URI}&scope=streaming%20user-read-email%20user-read-playback-state%20user-modify-playback-state`;

const Login = () => {
  useEffect(() => {
    if (localStorage.getItem("code") !== null) {
      window.location.href = AUTH_URL;
      console.log("ok");
    }
  }, []);
  return (
    <LoginContainer>
      {localStorage.getItem("code") !== null && <LoaderPage />}
      <H1>beatpoints.</H1>
      <LoginBtn>
        <ABtn href={AUTH_URL}>Login with Spotify</ABtn>
        <Advice>
          ⚠️&nbsp;
          <LinkPremium
            href="https://www.spotify.com/es/premium/"
            target="_blank"
            rel="noreferrer"
          >
            Spotify Premium
          </LinkPremium>
          &nbsp;account is required.
        </Advice>
      </LoginBtn>

      <Footer>
        <LinkFooter
          href="https://pixelfaces.vercel.app"
          target="_blank"
          rel="noreferrer"
        >
          pixelfaces.vercel.app
        </LinkFooter>
      </Footer>
    </LoginContainer>
  );
};

export default Login;
