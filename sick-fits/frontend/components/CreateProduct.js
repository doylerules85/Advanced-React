import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';

import DisplayError from './ErrorMessage';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    #which variables are getting passed in? and what types are there?
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: 'test',
    price: 2323,
    description: 'new description.',
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        await createProduct();
        clearForm();
        // go to the product page
        Router.push({
          pathname: `/product/${data.createProduct.id}`,
        });
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input id="image" name="image" type="file" onChange={handleChange} />
        </label>
        <label htmlFor="name">
          Name
          <input
            id="name"
            name="name"
            placeholder="name"
            type="text"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          price
          <input
            id="price"
            name="price"
            placeholder="price"
            type="number"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="description"
            type="textarea"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">+ add</button>
        {/* <button type="button" onClick={resetForm}>
          Reset
        </button> */}
      </fieldset>
    </Form>
  );
}

export default CreateProduct;
