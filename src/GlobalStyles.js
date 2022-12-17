import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
  font-size: 16px;
  font-family: sans-serif;
  line-height: 1.6;
  scroll-behavior: smooth;
  background-color: ${({ theme }) => theme.colors.colorOne};
}

*,
*::after,
*::before {
   box-sizing: inherit;
}

body {
  width: 100%;
  height:100%;
  margin: 0;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.colorOne};
   font-family: ${({ theme }) => theme.fonts.logoFont}, sans-serif;
  font-size: 1rem;
  color:  ${({ theme }) => theme.colors.colorTwo};
  scroll-behavior: smooth;
  @media (min-width: 640px) {
     font-size: 0.9rem;
  }
}

h1{
  font-family: ${({ theme }) => theme.fonts.logoFont}, sans-serif;
  color: ${({ theme }) => theme.colors.colorTwo};
}
`;
