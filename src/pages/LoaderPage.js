import React from "react";
import { H1Loader, LoaderContainer } from "./LoaderPage.styles.js";
import "../css/loader.css";

const LoaderPage = () => {
  return (
    <LoaderContainer>
      <H1Loader>beatpoints.</H1Loader>
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </LoaderContainer>
  );
};

export default LoaderPage;
