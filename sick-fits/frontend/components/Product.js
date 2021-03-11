import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/FormatMoney';

export default function Product({ product }) {
  return (
    <ItemStyles>
      {/* nested chaining */}
      <img src={product?.photo?.image?.publicUrl} alt="image" />
      <Title>
        <Link href={`/products/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
    </ItemStyles>
  );
}
