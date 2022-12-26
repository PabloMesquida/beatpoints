import styled from "styled-components";

let vh = window.innerHeight;

export const LoaderContainer = styled.div`
  z-index: 999999;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  height: ${vh}px;
  background: rgb(14, 23, 37);
  background: -moz-radial-gradient(
    circle,
    rgba(17, 38, 53, 1) 0%,
    rgba(8, 8, 22, 1) 89%
  );
  background: -webkit-radial-gradient(
    circle,
    rgba(17, 38, 53, 1) 0%,
    rgba(8, 8, 22, 1) 89%
  );
  background: radial-gradient(
    circle,
    rgba(17, 38, 53, 1) 0%,
    rgba(8, 8, 22, 1) 89%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#112635",endColorstr="#080816",GradientType=1);
`;

export const H1Loader = styled.span`
  font-size: 3rem;
  font-family: ${({ theme }) => theme.fonts.logoFont}, sans-serif;
  color: ${({ theme }) => theme.colors.colorOne};
  //color: transparent;
  background: ${({ theme }) => theme.colors.colorOne};
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.02);
  @media (min-width: 900px) {
    font-size: 5rem;
  }
`;
