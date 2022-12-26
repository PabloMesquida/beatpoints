import styled from "styled-components";

export const SongContainer = styled.div``;

export const ImgArtistContiner = styled.div`
  z-index: 1;
  position: relative;
`;

export const ImgArtist = styled.div`
  z-index: 1;
  position: relative;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 25vh;
  filter: blur(20px);
  -webkit-filter: blur(20px);
`;

export const Img = styled.div``;

export const H1Dashboard = styled.div`
  z-index: 10;
  position: absolute;
  display: flex;
  flex: 1;
  align-self: flex-end;
  flex-direction: column-reverse;
  top: -10px;
  left: 0px;
  height: 25vh;
  padding: 0 1rem;
  margin-top: 0;
  margin-bottom: 0;
  text-shadow: 0px 0px 25px rgba(0, 0, 0, 1);
  color: #fff;
  font-size: 2.5rem;
  line-height: 2.5rem;
  font-weight: bolder;
  @media (min-width: 900px) {
    padding: 0 3rem;
  }
`;

export const ArtistContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;
  @media (min-width: 900px) {
    margin: 1rem 3rem;
  }
`;

export const ArtistAvatar = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
`;

export const AlbumImg = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 5px;
  margin-right: 1rem;
`;

export const H2Dashboard = styled.h2`
  font-weight: normal;
  padding-left: 1rem;
  font-size: 1.2rem;
  //color: #cdcdcd;
`;

export const InfoContainer = styled.div``;

export const InfoAlbumContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid ${({ theme }) => theme.colors.colorFive};
  border-radius: 10px;
  padding: 1rem;
  margin: 0 1rem;
  @media (min-width: 900px) {
    margin: 0 3rem;
  }
`;

export const InfoAlbum = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AlbumName = styled.span``;

export const AlbumRelease = styled.span`
  opacity: 0.5;
`;
