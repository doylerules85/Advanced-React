import Link from 'next/link';
import NavStyles from './styles/NavStyles';

const Nav = () => (
  <NavStyles>
    <Link href="/account">account</Link>
    <Link href="/products">products</Link>
    <Link href="/orders">orders</Link>
    <Link href="/sell">sell</Link>
  </NavStyles>
);

export default Nav;
