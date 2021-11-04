import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

import { useQuery } from '../../../hooks/routesHooks';
import { useStore } from '../../../stores/store';
import LoadingComponent from '../../LoadingComponent/LoadingComponent';
import ProductList from './ProductList';

const ProductsPage = () => {
  const {
    productStore: { amount, loadingInitial, loadProducts },
  } = useStore();
  const query = useQuery();
  const location = useLocation();
  const page = query.has('page') ? Number(query.get('page')) : 1;
  const pageSize = query.has('pageSize') ? Number(query.get('pageSize')) : 5;
  const totalPages = Math.ceil(amount / pageSize);

  useEffect(() => {
    loadProducts(page, pageSize);
  }, [page, pageSize, location.key, loadProducts]);

  if (loadingInitial) return <LoadingComponent label="Loading products..." />;

  return (
    <div>
      {amount === 0 ? (
        <div>No products avaliable</div>
      ) : (
        <ProductList page={page} totalPages={totalPages} />
      )}
    </div>
  );
};

export default observer(ProductsPage);
