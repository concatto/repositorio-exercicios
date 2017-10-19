import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/home">R.E.A.P.</Link>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    )
  }
}

export default NavigationBar;
