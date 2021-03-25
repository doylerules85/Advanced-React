import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';

// SIGNUP MUTATION
const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  // use form hook setup
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    token,
  });
  // variables from the RESET mutation
  const [reset, { loading, data, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });
  //   handle submit function
  async function handleRequest(e) {
    e.preventDefault();
    await reset();
    resetForm();
  }
  // setting up the error if mutation fails
  const mutationError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;
  // JSX
  return (
    <Form method="post" onSubmit={handleRequest}>
      <h2>Reset</h2>
      <DisplayError error={error || mutationError} />
      {data?.redeemUserPasswordResetToken === null && (
        <p>success! you can now log in! </p>
      )}
      <fieldset>
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

        <button type="submit">Reset</button>
      </fieldset>
    </Form>
  );
}
