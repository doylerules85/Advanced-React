import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  # make mutation - add varaibles & types / required
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          name
          id
          email
        }
      }
    }
  }
`;

export default function SignIn() {
  // use form hook setup
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  // variables from the signin mutation
  const [signin, { loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  //   handle submit function
  async function handleSubmit(e) {
    e.preventDefault();
    await signin();
  }
  // JSX
  return (
    <Form method="post" onSubmit={handleSubmit}>
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
        <button type="submit">Sign in</button>
      </fieldset>
    </Form>
  );
}
