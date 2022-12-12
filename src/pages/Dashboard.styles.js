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
  width: 90px;
  margin: 10px;
`;

export const DataSongContainer = styled.div`
  width: 40vw;
  min-width: 400px;
  margin: 10px;
  background-color: #000;
  opacity: 0.4;
  border-radius: 10px;
`;

export const DisplayContainer = styled.div`
  flex: 1;
`;
