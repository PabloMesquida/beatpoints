import styled from "styled-components";

export const SongContainer = styled.div``;

export const ImgArtistContiner = styled.div`
  position: relative;
`;

export const ImgArtist = styled.div`
  z-index: 1;
  position: relative;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 300px;
  filter: blur(20px);
  -webkit-filter: blur(20px);
`;

export const Img = styled.div``;

export const H1Dashboard = styled.div`
  z-index: 10;
  position: absolute;
  display: flex;
  align-self: flex-end;
  flex-direction: column-reverse;
  top: -10px;
  left: 0px;
  height: 300px;
  padding-left: 3rem;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 3rem;
  font-weight: bolder;
  text-shadow: 0px 0px 9px rgba(0, 0, 0, 0.8);
`;
export const H2Dashboard = styled.h2`
  font-weight: normal;
  margin-top: 0;
  padding-left: 3rem;
  font-size: 1rem;
`;
