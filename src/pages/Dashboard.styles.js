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
  display: flex;
  flex-direction: column;
  flex: 0;
  width: 50vw;
  min-width: 450px;
  overflow: hidden;
  margin: 0.5rem 0 0.5rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.colorFour};
  background: rgb(12, 97, 95);
  border-radius: 10px;
  background: linear-gradient(145deg, #101829 70%, #0c2133 100%);
  max-height: 97.8%;
`;

export const DataSec1 = styled.div`
  flex: 0;
`;

export const DataSec2 = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  margin: 1rem 3rem 3rem 3rem;
  flex: 1;
  &::-webkit-scrollbar {
    width: 16px;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.colorOne};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.colorFive};
    border-radius: 16px;
    width: 16px;
  }
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
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#112635",endColorstr="#080816",GradientType=1);
`;
