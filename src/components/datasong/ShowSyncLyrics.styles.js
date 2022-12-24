import styled from "styled-components";
import { animated } from "react-spring";

export const ShowSyncLyricsContainer = styled.div`
  overflow-y: hidden;
  height: 22vh;
  margin-top: -0.5rem;
`;

export const LyricLine = styled(animated.div)`
  position: realtive;
  font-size: 1rem;
  padding: 1px 0;
  opacity: 0.5;
  bottom: 0;
`;
