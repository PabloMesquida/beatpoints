import styled from "styled-components";

let vh = window.innerHeight;

export const DashboardContainer = styled.div`
  display: flex;
  flex: 0;
  flex-direction: column;
  width: 100vw;
  align-items: flex-start;
  @media (min-width: 900px) {
    flex-wrap: wrap;
    flex-direction: row;
    height: 100vh;
    height: ${vh}px;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: #000;
  padding-top: 0.5rem;
  height: 200px;
  border-top: 1px solid ${({ theme }) => theme.colors.colorFive};
  margin-top: 1rem;
  @media (min-width: 900px) {
    width: 130px;
    border-left: 1px solid ${({ theme }) => theme.colors.colorFive};
    height: 100vh;
    height: ${vh}px;
    margin-top: 0;
  }
`;

export const DataSongContainer = styled.div`
  display: flex;
  //flex: 1;
  // position: static;
  // flex: 0;
  flex-direction: column;
  width: calc(100% - 2rem);
  height: 97.8vh;
  background-color: ${({ theme }) => theme.colors.colorFour};
  background: rgb(12, 97, 95);
  border-radius: 10px;
  background: linear-gradient(145deg, #101829 70%, #0c2133 100%);
  overflow: hidden;
  margin: 0 1rem;
  @media (min-width: 900px) {
    margin: 0;
    flex: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: 97.8%;
    overflow: hidden;
    width: 50%;
    min-width: 450px;
    margin: 0.5rem 0 0.5rem 0.5rem;
  }
`;

export const DataSec1 = styled.div`
  flex: 0;
`;

export const DataSec2 = styled.div`
  display: flex;
  margin: 1rem;
  padding: 1rem 0rem 1rem 1.5rem;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.colorOne};
  flex: 1;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 16px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.colorOne};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.colorFive};
    border-radius: 16px;
    width: 16px;
  }
  @media (min-width: 900px) {
    margin: 1rem 3rem 3rem 3rem;
    padding: 1rem 0rem 1rem 1.5rem;
  }
`;

export const DisplayContainer = styled.div`
  height: 95vh;
  // height: ${vh}px;
  position: static;
  // background-position: top 50px;
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
  @media (min-width: 900px) {
    flex: 1;
    height: 100vh;
    height: ${vh}px;
    position: relative;
    //  background-position: center;
  }
`;
