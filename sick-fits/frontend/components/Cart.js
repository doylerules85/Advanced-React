import styled from 'styled-components';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import { useUser } from './User';
import formatMoney from '../lib/formatMoney';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--green);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;
// component for cart item
const CartItem = ({ cartItem }) => {
  const { product } = cartItem;
  return (
    <CartItemStyles>
      <img
        width={100}
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)}-
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)}
          </em>
        </p>
      </div>
    </CartItemStyles>
  );
};

export default function Cart() {
  const me = useUser();
  // call the cart hook to get variables to update cart open state
  const { cartOpen, closeCart } = useCart();
  if (!me) {
    return <p>not signed in? sign in to save items in the cart</p>;
  }
  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{me.name}'s cart</Supreme>
        <button type="button" onClick={closeCart}>
          close cart yo
        </button>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          // passing cartItem comppnent here
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
      </footer>
    </CartStyles>
  );
}
