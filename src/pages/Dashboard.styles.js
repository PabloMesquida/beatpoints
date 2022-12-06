import styled from "styled-components";

let vh = window.innerHeight;

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
  height: ${vh}px;
  border: 1px solid #fff;
`;

export const UserContainer = styled.div`
  width: 10vw;
  margin: 0.2rem 0 0.2rem 0.2rem;
  background-color: "#ff0";
`;

export const DataSongContainer = styled.div`
  width: 30vw;
  margin: 0.2rem 0;
  background-color: "#f0f";
`;

export const DisplayContainer = styled.div`
  width: 10vw;
  background-color: "#0ff";
`;
