import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';

// SIGNUP MUTATION
const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  // use form hook setup
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });
  // variables from the RESET mutation
  const [requestReset, { loading, data, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );
  //   handle submit function
  async function handleRequest(e) {
    e.preventDefault();
    await requestReset();
    resetForm();
  }
  // JSX
  return (
    <Form method="post" onSubmit={handleRequest}>
      <h2>Forgot Password?</h2>
      <DisplayError error={error} />
      {data?.sendUserPasswordResetLink === null && (
        <p>success resetting! check email! </p>
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

        <button type="submit">Reset</button>
      </fieldset>
    </Form>
  );
}
