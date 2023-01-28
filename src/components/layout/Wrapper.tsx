import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
    ${normalize}
    * {
        text-decoration: none;
    }

    html {
        box-sizing: border-box;
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
        scroll-behavior: initial;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background: ${(props: any) => props.theme.background};
        color:  ${(props: any) => props.theme.color};
        overscroll-behavior: none;
        overflow-x: hidden;
    }
    
    html, body {
        min-height: 100%;
        height: auto;
    }
`;

const Wrapper = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const darkTheme = {
    background: '#101010',
    color: '#ffffff',
  };

  const lightTheme = {
    background: '#ffffff',
    color: '#101010',
  };

  return (
    <ThemeProvider theme={lightTheme || darkTheme}>
      <GlobalStyle />
      <main>{children}</main>
    </ThemeProvider>
  );
};

export default Wrapper;
