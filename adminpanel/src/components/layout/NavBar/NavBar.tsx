import { NavLink } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

const NavBar = () => {
  return (
    <div>
      <Menu color="blue">
        <Container>
          <Menu.Item as={NavLink} to="/" name="Home" exact />
          <Menu.Item as={NavLink} to="/products" name="Products" />
        </Container>
      </Menu>
    </div>
  );
};

export default NavBar;
