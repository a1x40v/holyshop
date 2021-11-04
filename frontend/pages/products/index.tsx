import { GetServerSideProps, NextPage } from 'next';

import { PAGE_SIZE } from '../../constants';
import { ProductsData } from '../../types/models/Product';
import ProductList from '../../components/ProductList/ProductList';

interface Props {
  productsData: ProductsData;
  page: number;
}

const ProductsPage: NextPage<Props> = ({ productsData, page }) => {
  const { data, amount } = productsData;
  const totalPages = Math.ceil(amount / PAGE_SIZE);

  return (
    <>
      <ProductList products={data} page={page} totalPages={totalPages} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = query.page ? Number(query.page) : 1;
  const response = await fetch(
    `http://api/products?page=${page}&pageSize=${PAGE_SIZE}`
  );
  const body = (await response.json()) as ProductsData;

  return {
    props: { productsData: body, page },
  };
};

export default ProductsPage;
