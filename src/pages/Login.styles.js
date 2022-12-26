import styled from "styled-components";

let vh = window.innerHeight;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem 4rem;
  width: 100vw;
  height: 100vh;
  height: ${vh}px;
  background: rgb(12, 97, 95);
  background: radial-gradient(
      circle farthest-corner at left center,
      rgba(12, 97, 95, 0.7) 0%,
      rgba(16, 24, 41, 0.5) 100%
    ),
    radial-gradient(
      circle farthest-corner at bottom right,
      rgba(116, 27, 136, 0.7) 0%,
      rgba(16, 24, 41, 0.5) 100%
    );

  @media (min-width: 900px) {
    padding: 6rem 12rem;
  }
`;

export const H1 = styled.h1`
  font-size: 3rem;
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

export const LoginBtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media (min-width: 900px) {
    flex-direction: row;
    justify-content: flex-start;
  }
`;

export const Advice = styled.span`
  display: flex;
  margin-left: 0rem;
  margin-top: 1rem;
  font-size: 0.8rem;
  justify-content: flex-start;
  @media (min-width: 900px) {
    display: flex;
    margin-left: 2rem;
    margin-top: 0rem;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const LinkPremium = styled.a`
  font-size: 0.8rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.colorTwo};

  &:hover {
    text-decoration: underline;
  }
`;

export const Footer = styled.div`
  margin-top: 5rem;
  opacity: 0.5;
`;

export const LinkFooter = styled.a`
  font-size: 0.8rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.colorTwo};
  margin-right: 0.3rem;
  &:hover {
    text-decoration: underline;
  }
`;
