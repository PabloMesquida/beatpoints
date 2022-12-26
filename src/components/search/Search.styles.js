import styled from "styled-components";

export const SearchContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const SearchInput = styled.input`
  width: 90%;
  margin-top: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 5rem;
  color: #fff;
  background-color: #000;
  border: 0;
  font-size: 1rem;
  font-weight: bold;
  padding-left: 2rem;
`;

export const ResultsContainer = styled.div`
  background-color: rgba(256, 256, 256, 0.05);
  backdrop-filter: blur(5px);
  width: 82%;
  border-radius: 0 0 10px 10px;
  margin-top: 0.2rem;
`;
