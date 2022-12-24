import styled from "styled-components";

export const NextTrackContainer = styled.div`
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  background-color: ${({ theme }) => theme.colors.colorFour};
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: lighter;
`;

export const NextTrackTxt = styled.span`
  color: #fff;
  padding: 0 0.5rem;
`;

export const NextArtistTxt = styled.span`
  color: #fff;
  opacity: 0.5;
  padding: 0 0.5rem;
`;

export const NextCounter = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.colorFour};
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.colorTwo};
  font-weight: bold;
`;
