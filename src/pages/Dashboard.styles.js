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
  margin: 0.2rem 0 0.2rem 0.2rem;
  background-color: ${({ theme }) => theme.colors.colorFour};
`;

export const DataSongContainer = styled.div`
  width: 30vw;
  margin: 0.2rem 0;
  background-color: ${({ theme }) => theme.colors.colorFour};
`;

export const DisplayContainer = styled.div`
  width: 10vw;
  background-color: ${({ theme }) => theme.colors.colorFour};
`;
