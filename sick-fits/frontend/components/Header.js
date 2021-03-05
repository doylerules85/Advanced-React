import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  background: var(--green);
  transform: skew(-7deg);
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: center;
  }
  .search {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black);
  }
`;

const Header = () => (
  <HeaderStyles>
    <div className="bar">
      <Logo>
        <Link href="/">Home Sick</Link>
      </Logo>
    </div>
    <div className="search">search</div>
    <Nav />
  </HeaderStyles>
);

export default Header;
