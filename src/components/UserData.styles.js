import styled from "styled-components";

export const UserDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ImageContainer = styled.div``;

export const AvatarImage = styled.img`
  border-radius: 50%;
  width: 80px;
`;

export const BeatpointsText = styled.div`
  position: absolute;
  transform: rotate(-90deg);
  opacity: 0.2;
  font-size: 3rem;
  bottom: 100px;
`;
