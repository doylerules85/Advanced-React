import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

function resetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        <p>token needed begin resetting.</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>reset password {query.token}</p>
      <Reset token={query.token} />
    </div>
  );
}

export default resetPage;
