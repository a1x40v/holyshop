import Link from 'next/link';
import { Image } from 'semantic-ui-react';

import { Product } from '../../types/models/Product';
import style from './ProductItem.module.css';

interface Props {
  product: Product;
}

const ProductItem: React.FC<Props> = ({ product }) => {
  const image = product.image || 'no-photo.png';

  return (
    <div className={style.card}>
      <div className={style.imageColumn}>
        <Image src={`/images/products/${image}`} alt={product.title} />
      </div>
      <div>
        <Link href={`/products/${product.id}`}>
          <a className={style.title}>{product.title}</a>
        </Link>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default ProductItem;
