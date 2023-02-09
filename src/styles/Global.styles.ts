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

export const Navigation = styled.nav`
  display: flex;
  gap: 4rem;
  position: fixed;
  top: 5%;
  left: 45%;

  a {
    font-size: 2.2rem;
    font-weight: 300;
    color: #bebebe;
    /* color: ${(props) => props.theme.color}; */
    transition: all 0.3s;
  }
  a:hover {
    color: ${(props) => props.theme.color};
    transform: scale(1.1);
  }
  a:active {
    transform: scale(1);
  }
`;

export const BackButton = styled.div`
  display: inline-block;
  position: fixed;
  top: 5%;
  left: 4rem;
  transition: all 0.3s;

  a {
    font-size: 2.2rem;
    font-weight: 300;

    text-transform: uppercase;
    color: ${(props) => props.theme.color};
  }
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(1);
  }
`;
