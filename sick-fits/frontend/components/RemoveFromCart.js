import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_CART_ITEM = gql`
  mutation DELETE_CART_ITEM($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemoveFromCart({ id }) {
  const [deleteCartItem, { loading }] = useMutation(DELETE_CART_ITEM, {
    variables: {
      id,
    },
    update,
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <button disabled={loading} type="button" onClick={deleteCartItem}>
      Remove
    </button>
  );
}
