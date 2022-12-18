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
  display: flex;
  width: 130px;
  background-color: #000;
  padding-top: 0.5rem;
  border-left: 1px solid ${({ theme }) => theme.colors.colorFive};
`;

export const DataSongContainer = styled.div`
  width: 38vw;
  min-width: 400px;
  overflow: hidden;
  margin: 0.5rem 0 0.5rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.colorFour};
  background: rgb(12, 97, 95);
  border-radius: 10px;
  //box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  //box-shadow: 25px 25px 50px #0f1727, -25px -25px 50px #11192b;
  background: linear-gradient(145deg, #101829 70%, #0c2133 100%);
`;

export const DisplayContainer = styled.div`
  flex: 1;
  position: relative;
  background: rgb(8, 8, 22);
  background: -moz-radial-gradient(
    circle,
    rgba(8, 8, 22, 1) 0%,
    rgba(14, 23, 37, 1) 24%,
    rgba(8, 8, 22, 1) 68%
  );
  background: -webkit-radial-gradient(
    circle,
    rgba(8, 8, 22, 1) 0%,
    rgba(14, 23, 37, 1) 24%,
    rgba(8, 8, 22, 1) 68%
  );
  background: radial-gradient(
    circle,
    rgba(8, 8, 22, 1) 0%,
    rgba(14, 23, 37, 1) 24%,
    rgba(8, 8, 22, 1) 68%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#080816",endColorstr="#080816",GradientType=1);
`;
