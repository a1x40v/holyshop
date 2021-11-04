import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Icon, Menu, Table } from 'semantic-ui-react';

import { useStore } from '../../../stores/store';

interface Props {
  page: number;
  totalPages: number;
}

const ProductList = ({ page, totalPages }: Props) => {
  const [processedId, setProcessedId] = useState('');
  const {
    productStore: { products, loading, deleteProduct },
  } = useStore();
  const history = useHistory();

  if (products.length === 0) {
    history.push(`/products`);
  }

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {products.map((product) => {
          const buttonLoading = loading && product.id === processedId;
          return (
            <Table.Row key={product.id}>
              <Table.Cell width="2">{product.title}</Table.Cell>
              <Table.Cell width="2">${product.price}</Table.Cell>
              <Table.Cell width="3">{product.description}</Table.Cell>
              <Table.Cell width="1">
                <Button
                  icon="remove"
                  loading={buttonLoading}
                  disabled={buttonLoading}
                  onClick={() => {
                    setProcessedId(product.id);
                    deleteProduct(product.id);
                  }}
                />
                <Button
                  icon="edit"
                  onClick={() => {
                    history.push(`/manage/${product.id}`);
                  }}
                />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="4">
            <Menu floated="right" pagination>
              <Menu.Item
                icon
                as={Link}
                to={`/products?page=${Math.max(1, page - 1)}`}
                disabled={page === 1}
              >
                <Icon name="chevron left" />
              </Menu.Item>
              {[...new Array(totalPages)].map((_, idx) => (
                <Menu.Item
                  key={idx}
                  as={Link}
                  to={`/products?page=${idx + 1}`}
                  disabled={idx + 1 === page}
                >
                  {idx + 1}
                </Menu.Item>
              ))}
              <Menu.Item
                icon
                as={Link}
                to={`/products?page=${Math.min(totalPages, page + 1)}`}
                disabled={page === totalPages}
              >
                <Icon name="chevron right" />
              </Menu.Item>
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default observer(ProductList);
