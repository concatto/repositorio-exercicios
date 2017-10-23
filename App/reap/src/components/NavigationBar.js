import React from 'react';
import { Link } from 'react-router-dom';
import LinkNavItem from './LinkNavItem';
import { Navbar, Nav } from 'react-bootstrap';

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/reap">R.E.A.P.</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkNavItem to="/reap/create">
            Criar exercício
          </LinkNavItem>
        </Nav>
      </Navbar>
    )
  }
}

export default NavigationBar;
