import styled, { css } from 'styled-components';

export const Container = styled.div<{ fluid?: boolean }>`
  flex-grow: 1;
  margin: 0 auto;
  padding: 7rem 5rem 0 5rem;
  position: relative;
  width: auto;
  height: 100%;

  // If Container component has props fluid apply this css
  ${(props) =>
    props.fluid &&
    css`
      max-width: 100%;
      padding: 0;
      margin: 0;
    `}
`;

export const Flex = styled.div<{
  gap?: number;
  flexEnd?: boolean;
  spaceBetween?: boolean;
  alignTop?: boolean;
  noHeight?: boolean;
  column?: boolean;
}>`
  position: relative;
  display: flex;

  gap: ${(props) => props.gap + 'rem'};

  ${(props) =>
    props.column &&
    css`
      flex-direction: column;
    `}

  ${(props) =>
    props.flexEnd &&
    css`
      justify-content: flex-end;
    `}
  ${(props) =>
    props.spaceBetween &&
    css`
      justify-content: space-between;
    `}
    ${(props) =>
    props.alignTop &&
    css`
      align-items: top;
    `}
    ${(props) =>
    props.noHeight &&
    css`
      height: 0;
    `};
`;
