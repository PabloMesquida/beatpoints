import styled from "styled-components";

export const ImgReplaceContainer = styled.div`
  display: flex;
  align-items: flex-end;
  height: 25vh;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.colorFive};
  background: rgb(12, 97, 95);
  background: radial-gradient(
      circle farthest-corner at left center,
      rgba(12, 97, 95, 0.2) 0%,
      rgba(16, 24, 41, 0.4) 100%
    ),
    radial-gradient(
      circle farthest-corner at bottom right,
      rgba(116, 27, 136, 0.2) 0%,
      rgba(16, 24, 41, 0.1) 100%
    );
  @media (min-width: 900px) {
    padding: 1rem 3rem;
  }
`;

export const H1Img = styled.span`
  display: flex;
  align-self: flex-end;
  font-size: 3rem;
  opacity: 0.6;
  @media (min-width: 900px) {
    font-size: 4rem;
  }
`;
