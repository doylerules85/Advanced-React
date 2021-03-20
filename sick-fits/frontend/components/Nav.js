import Link from 'next/link';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

const Nav = () => {
  const user = useUser();
  return (
    <NavStyles>
      <Link href="/products">products</Link>
      {user && (
        <>
          <Link href="/account">account</Link>
          <Link href="/orders">orders</Link>
          <Link href="/sell">sell</Link>
          <SignOut />
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign in</Link>
        </>
      )}
    </NavStyles>
  );
};

export default Nav;
