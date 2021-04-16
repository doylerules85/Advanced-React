import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    Order(where: { id: $id }) {
      id
      total
      items {
        name
        price
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

export default function SingleOrder({ id }) {
  const { loading, error, data } = useQuery(SINGLE_ORDER_QUERY, {
    variables: {
      id,
    },
  });
  return (
    <div>
      {data.Order.items.map((item) => {
        <div>
          <p>item.name</p>
        </div>;
      })}
    </div>
  );
}
