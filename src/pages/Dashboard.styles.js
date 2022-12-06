import styled from "styled-components";

let vh = window.innerHeight;

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100vw;
  height: 100vh;
  height: ${vh}px;
`;

export const UserContainer = styled.div`
  width: 10vw;
  margin: 1vw 0 1vw 1vw;
  background-color: #000;
  opacity: 0.6;
  border-radius: 10px 0 0 10px;
`;

export const DataSongContainer = styled.div`
  width: 30vw;
  margin: 1vw 0;
  background-color: #000;
  opacity: 0.4;
  border-radius: 0px 10px 10px 0px;
`;

export const DisplayContainer = styled.div`
  width: 59vw;
`;
