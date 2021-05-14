import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';
import AddToCart from './AddToCart';

import DisplayError from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      id
      price
      description
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  img {
    width: 300px;
    height: auto;
  }

  .details {
    p {
      font-size: 1.6rem;
    }
    h2 {
      font-size: 3.5rem;
    }
  }
`;

export default function SingleProduct({ id }) {
  const { loading, error, data } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });
  if (loading) {
    return <p>loading....</p>;
  }
  if (error) {
    return <DisplayError error={error} />;
  }
  const { Product } = data;
  return (
    <ProductStyles>
      <img src={Product.photo.image.publicUrlTransformed} alt="text" />
      <div className="details">
        <h2>{Product.name}</h2>
        <p>{formatMoney(Product.price)}</p>
        <p>{Product.description}</p>
        <AddToCart id={Product.id} />
      </div>
    </ProductStyles>
  );
}
