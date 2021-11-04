import { Route, Switch, useLocation } from 'react-router';
import { Container } from 'semantic-ui-react';

import HomePage from '../../pages/HomePage/HomePage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import ProductsPage from '../../pages/ProductsPage/ProductsPage';
import ProductForm from '../../ProductForm/ProductForm';
import NavBar from '../NavBar/NavBar';
import style from './App.module.css';

const App = () => {
  const location = useLocation();

  return (
    <div className={style.app}>
      <Container>
        <NavBar />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/products" component={ProductsPage} />
          <Route
            key={location.key}
            path={['/createProduct', '/manage/:id']}
            component={ProductForm}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </div>
  );
};

export default App;
