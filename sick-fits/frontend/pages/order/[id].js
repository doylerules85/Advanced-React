import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import OrderStyles from '../../components/styles/OrderStyles';
import ErrorMessage from '../../components/ErrorMessage';
import formatMoney from '../../lib/formatMoney';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            id
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

export default function SingleOrderPage({ query }) {
  const { data, loading, error } = useQuery(SINGLE_ORDER_QUERY, {
    variables: {
      id: query.id,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { order } = data;
  console.log(order);
  return (
    <OrderStyles>
      <Head>
        <title>Homesick - {order.id}</title>
      </Head>
      <div>
        <span>Order ID</span>
        <span>{order.id}</span>
      </div>
      <div>
        <span>Charge:</span>
        <p>{order.charge}</p>
      </div>
      <div>
        <span>Order Total</span>
        <span>{formatMoney(order.total)}</span>
      </div>
      <div>
        <span>ItemCount:</span>
        <span>{order.items.count}</span>
      </div>
      <div className="items">
        {order.items.map((item) => (
          <div className="order-item" key={item.id}>
            <img src={item.photo.image.publicUrlTransformed} alt={item.title} />
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>Qty: {item.quantity}</p>
              <p>Price: {formatMoney(item.price * item.quantity)}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
}
