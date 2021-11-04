import { useRouter } from 'next/dist/client/router';
import { Button, Grid, Icon, Menu } from 'semantic-ui-react';

import { Product } from '../../types/models/Product';
import ProductItem from '../ProductItem/ProductItem';
import style from './ProductList.module.css';

interface Props {
  products: Product[];
  page: number;
  totalPages: number;
}

const ProductList: React.FC<Props> = ({ products, page, totalPages }) => {
  const router = useRouter();
  const COLUMNS = 3;
  const rows = Math.ceil(products.length / COLUMNS);

  const grid: React.ReactNode[] = [];

  const rowsEl = [...new Array(rows)].map((_, rowIdx) => (
    <Grid.Row key={rowIdx}>
      {[...new Array(COLUMNS)].map((_, idx) => {
        const product = products[rowIdx * COLUMNS + idx];
        return product ? (
          <Grid.Column key={product.id}>
            <ProductItem product={product} />
          </Grid.Column>
        ) : null;
      })}
    </Grid.Row>
  ));

  return (
    <div className={style.wrapper}>
      <h1 className={style.pageTitle}>Список продуктов</h1>
      <Grid className={style.grid} columns={COLUMNS} divided>
        {rowsEl}
      </Grid>

      <div className={style.pagination}>
        <Menu pagination>
          <Menu.Item
            icon
            as={Button}
            onClick={() => router.push(`/products?page=${page - 1}`)}
            disabled={page <= 1}
          >
            <Icon name="chevron left" />
          </Menu.Item>
          {[...new Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <Menu.Item
                key={idx}
                as={Button}
                disabled={Number(page) === Number(pageNum)}
                onClick={() => router.push(`/products?page=${pageNum}`)}
              >
                {pageNum}
              </Menu.Item>
            );
          })}
          <Menu.Item
            icon
            as={Button}
            onClick={() => router.push(`/products?page=${page + 1}`)}
            disabled={page >= totalPages}
          >
            <Icon name="chevron right" />
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default ProductList;
