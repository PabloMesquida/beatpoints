import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
`;

export const H1 = styled.h1`
  font-size: 2rem;
  @media (min-width: 900px) {
    font-size: 5rem;
  }
`;

export const ABtn = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 165px;
  padding: 1.2rem 1rem;
  background-color: ${({ theme }) => theme.colors.colorTwo};
  border-radius: 8px;
  font-size: 1rem;
  line-height: 0rem;
  letter-spacing: 0rem;
  text-decoration: none;
  &:link,
  &:visited,
  &:focus,
  &:hover,
  &:active {
    letter-spacing: 0rem;
    text-align: center;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.colorOne};
  }
`;
