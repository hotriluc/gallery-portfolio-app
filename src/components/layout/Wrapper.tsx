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
        font-family: 'Montserrat', sans-serif;
        background:  ${(props) => props.theme.background} ;
        color:  ${(props: any) => props.theme.color};
        overflow-x: hidden;
    }
    
    html, body, #root, main {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }

    h1 {
      font-size: 5rem;
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
      <>{children}</>
    </ThemeProvider>
  );
};

export default Wrapper;
