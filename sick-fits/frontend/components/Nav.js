import Link from 'next/link';
import { useCart } from '../lib/cartState';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

const Nav = () => {
  const user = useUser();
  const { toggleCart } = useCart();
  return (
    <NavStyles>
      <Link href="/products">products</Link>
      {user && (
        <>
          <Link href="/account">account</Link>
          <Link href="/orders">orders</Link>
          <Link href="/sell">sell</Link>
          <SignOut />
          <button type="button" onClick={toggleCart}>
            CART
          </button>
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
