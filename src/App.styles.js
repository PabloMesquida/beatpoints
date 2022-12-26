import styled from "styled-components";

let vh = window.innerHeight;

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  height: ${vh}px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
