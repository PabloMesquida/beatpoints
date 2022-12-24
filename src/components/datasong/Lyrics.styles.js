import styled from "styled-components";

export const LyricsContainer = styled.div`
  display: flex;
  //align-items: center;
  //justify-content: center;
  flex: 1;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 16px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.colorOne};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.colorFive};
    border-radius: 16px;
    width: 16px;
  }
`;
