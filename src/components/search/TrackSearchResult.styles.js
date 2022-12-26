import styled from "styled-components";

export const TrackResultContainer = styled.div`
  display: flex;
  width: 100%;
  padding-left: 1rem;
  margin: 0.5rem 0;
  cursor: pointer;
  font-size: 0.8rem;
  @media (min-width: 900px) {
    padding-left: 2rem;
    font-size: 1rem;
  }
`;

export const TrackResultAvatar = styled.img`
  width: 58px;
  height: 58px;
  border-radius: 0.5rem;
`;

export const TrackResultInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-left: 0.5rem;
`;

export const TrackResultName = styled.span``;

export const TrackResultArtist = styled.span`
  opacity: 0.5;
`;
