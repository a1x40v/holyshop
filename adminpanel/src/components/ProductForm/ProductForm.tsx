import { useHistory, useParams } from 'react-router';
import { Formik, Form } from 'formik';
import { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';

import { Product } from '../../models/Product';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import TextInput from '../common/form/TextInput';
import style from './ProductForm.module.css';

const initialValues: Product = {
  id: '',
  title: '',
  price: 10,
  description: '',
};

const validationSchema = Yup.object({
  title: Yup.string().required('The product title is required'),
  price: Yup.number()
    .positive('The product price must be greater than zero')
    .required('The product price is required'),
  description: Yup.string().required('The product price is required'),
});

const ProductForm = () => {
  const [product, setProduct] = useState<Product>(initialValues);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const {
    productStore: { loadingInitial, loadProduct, createProduct, updateProduct },
  } = useStore();

  useEffect(() => {
    if (id) {
      loadProduct(id)
        .then((data) =>
          setProduct({
            id: data.id,
            title: data.title,
            price: data.price,
            description: data.description,
          })
        )
        .catch((error) => {
          console.log('Can`t load product', error);
          history.push('/notfound');
        });
    }
  }, [id, loadProduct, history]);

  const onSubmit = (productValues: Product) => {
    if (!productValues.id) {
      const newProduct = { ...productValues, id: uuid() };
      createProduct(newProduct).then(() => {
        history.push('/products');
      });
    } else {
      updateProduct(productValues).then(() => {
        history.push('/products');
      });
    }
  };

  if (loadingInitial) return <LoadingComponent label="Loading product" />;

  return (
    <div className={style.form}>
      <Formik
        enableReinitialize
        initialValues={product}
        validationSchema={validationSchema}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ isSubmitting, isValid, dirty, handleSubmit }) => (
          <Form className="ui form" autoComplete="off" onSubmit={handleSubmit}>
            <TextInput name="title" label="Title" placeholder="Product Title" />
            <TextInput
              name="price"
              label="Price"
              placeholder="Product Price"
              type="number"
            />
            <TextInput
              name="description"
              label="Description"
              placeholder="Product Description"
            />
            <Button
              type="submit"
              content="Submit"
              floated="right"
              positive
              loading={isSubmitting}
              disabled={isSubmitting || !isValid || !dirty}
            />
            <Button
              as={Link}
              to="/products"
              type="button"
              content="Cancel"
              floated="right"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default observer(ProductForm);
