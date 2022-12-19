import styled from "styled-components";

export const GenreTag = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  font-weight: 200;
  color: #cdcdcd;
  background-color: ${({ theme }) => theme.colors.colorFive};
  padding: 0.2rem 0.8rem;
  border-radius: 50px;
`;
