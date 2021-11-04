import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { Image } from 'semantic-ui-react';
import BeatLoader from 'react-spinners/BeatLoader';

import { Product } from '../../types/models/Product';
import style from '../../styles/Product.module.css';

interface Props {
  product: Product;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div style={{ margin: 'auto' }}>
        <BeatLoader color="blue" />
      </div>
    );
  }

  const image = product.image || 'no-photo.png';

  return (
    <div className={style.wrapper}>
      <Link href="/products">
        <a>Назад</a>
      </Link>
      <div className={style.content}>
        <Image
          src={`/images/products/${image}`}
          alt={product.title}
          className={style.image}
        />
        <div className={style.contentBlock}>
          <h1>{product.title}</h1>
          <span>Цена: ${product.price}</span>
          <p>Описание: {product.description}</p>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const response = await fetch(`http://api/products/${params!.productId}`);

  if (response.status !== 200) {
    return { notFound: true };
  }

  const body = (await response.json()) as Product;
  return { props: { product: body }, revalidate: 30 };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default ProductPage;
