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
  padding: 3rem;
  background-color: #000;
  opacity: 0.4;
  border-radius: 10px;
`;

export const DisplayContainer = styled.div`
  flex: 1;
`;

export const H1Dashboard = styled.h1`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 3rem;
`;
export const H2Dashboard = styled.h2`
  font-weight: normal;
  margin-top: 0;
  font-size: 1rem;
`;
