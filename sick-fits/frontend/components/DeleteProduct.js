import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

// delete mutation
const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  // payload is the object selected from deleteProduct
  console.log(payload);
  // once deleted - remove the element from the apollo cache as well
  cache.evict(cache.identify(payload.data.deleteProduct));
}

function DeleteProduct({ id, children }) {
  // getting destructured values from delete mutation
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      // getting variables
      variables: {
        id,
      },
      // passes update
      update,
    }
  );
  return (
    <button
      disabled={loading}
      onClick={() => {
        if (confirm('about to delete product')) {
          console.log('deleted');
          deleteProduct().catch((err) => alert(err.message));
        }
      }}
      type="button"
    >
      {children}
    </button>
  );
}

export default DeleteProduct;
