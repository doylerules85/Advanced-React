import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';

const GlobalStyles = createGlobalStyle`

    @font-face{
        font-family: 'radnika_next';
        src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');   
        font-weight: normal;
        font-style: normal;
    }
    html{
        --green: #6CBE4C;
        --black: #393939;
        --grey: #3a3a3a;
        --gray: var(--grey);
        --lightGrey: #e1e1e1;
        --lightGray: var(--lightGrey);
        --offWhite: #ededed;
        --maxWidth: 1000px;
        --bs: 0 12px 24px 0 rgba(0,0,0,0.09);
        box-sizing: border-box;
        font-size: 10px;
    }

    body{
        font-family: 'radnika_next',apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    *, *:before, *:after{
        box-sizing: inherit;
    }

    a{
        text-decoration: none;
        color: var(--black);
    }

    a:hover{
        text-decoration: underline;
    }

    button{
        font-family: 'radnika_next',apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
`;

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;

const Page = ({ children }) => (
  <div>
    <GlobalStyles />
    <Header />
    <h2>Im duh Page Component</h2>
    <InnerStyles> {children} </InnerStyles>
  </div>
);

export default Page;
