import styled, { css } from 'styled-components';

export const Ul = styled.ul`
  list-style-type: none;

  ${props =>
    props.primary &&
    css`
      background: red;
    `}
`;
export const Image = styled.img`
  width: 200px;
  height: 200px;
`;
