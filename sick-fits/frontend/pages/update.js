import UpdateProduct from '../components/UpdateProduct';

export default function updatePage({ query }) {
  return (
    <div>
      Update Page!
      <UpdateProduct id={query.id} />
    </div>
  );
}
