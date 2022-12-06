import { useState, useEffect } from "react";
import axios from "axios";

//const url = process.env.REACT_APP_REDIRECT_URI;
//const url = "http://localhost:3001";

export function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  console.log(refreshToken);

  useEffect(() => {
    axios
      .post("https://beatpoints-server.vercel.app/login", {
        code,
      })
      .then((res) => {
        // console.log(res.data);
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");
      })
      .catch((err) => {
        console.log("axios-error-login", err);
        ///  window.location = "/";
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    axios
      .post("https://beatpoints-server.vercel.app/refresh", {
        refreshToken,
      })
      .then((res) => {
        //console.log(res.data);
        setAccessToken(res.data.accessToken);
        setExpiresIn(res.data.expiresIn);
      })
      .catch((err) => {
        console.log("axios-error-refresh", err);
        //  window.location = "/";
      });
  }, [refreshToken, expiresIn]);

  return accessToken;
}
