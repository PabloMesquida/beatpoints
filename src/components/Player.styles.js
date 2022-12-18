import styled from "styled-components";

export const PlayerContainer = styled.div`
  position: absolute;
  display: flex;
  bottom: 10px;
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

export const PlayerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  background-color: #ff0;
  width: 90%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.colorFive};
  padding: 20px;
  // overflow-x: hidden;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

export const PlayerLogo = styled.div``;

export const LogoImg = styled.img`
  margin-right: 2rem;
`;

export const PlayContainer = styled.div`
  flex: 1;
`;
