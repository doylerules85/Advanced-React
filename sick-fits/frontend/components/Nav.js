import Link from 'next/link';

const Nav = () => (
  <nav>
    <Link href="/account">account</Link>
    <Link href="/products">products</Link>
    <Link href="/orders">orders</Link>
    <Link href="/sell">sell</Link>
  </nav>
);

export default Nav;
