import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

// SIGNUP MUTATION
const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
    }
  }
`;

export default function SignUp() {
  // use form hook setup
  const { inputs, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    password: '',
  });
  // variables from the SIGNUP mutation
  const [signup, { loading, data, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  //   handle submit function
  async function createUser(e) {
    e.preventDefault();
    await signup().catch(console.error(error));
    console.log({ data, loading, error });
  }
  // JSX
  return (
    <Form method="post" onSubmit={createUser}>
      <h2>Sign Up!</h2>
      <DisplayError error={error} />
      {data?.createUser && <p>success loggin in! </p>}
      <fieldset>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            placeholder="name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          password
          <input
            type="password"
            name="password"
            placeholder="password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign Up</button>
      </fieldset>
    </Form>
  );
}
