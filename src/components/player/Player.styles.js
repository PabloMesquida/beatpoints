import styled from "styled-components";

export const PlayerContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  bottom: 7vh;
  width: 100%;
  align-items: center;
  @media (min-width: 900px) {
    bottom: 0.5rem;
  }
`;

export const PlayerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-content: center;
  background-color: #ff0;
  width: 90%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.colorFive};
  padding: 20px;
  // overflow-x: hidden;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  @media (min-width: 900px) {
    flex-direction: row;
  }
`;

export const PlayerLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (min-width: 900px) {
    justify-content: flex-start;
  }
`;

export const LogoImg = styled.img`
  margin-right: 0rem;
  margin-bottom: 1rem;
  @media (min-width: 900px) {
    margin-bottom: 0;
    margin-right: 2rem;
  }
`;

export const PlayContainer = styled.div`
  flex: 1;
`;
