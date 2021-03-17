import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/FormatMoney';
import DeleteProduct from './DeleteProduct';

export default function Product({ product }) {
  return (
    <ItemStyles>
      {/* nested chaining */}
      <img src={product?.photo?.image?.publicUrl} alt={product.name} />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className="button-list">
        <Link
          href={{
            pathname: 'update',
            query: {
              id: product.id,
            },
          }}
        >
          Edit ✏️
        </Link>
        <DeleteProduct id={product.id}>Delete 🗑</DeleteProduct>
      </div>
    </ItemStyles>
  );
}
