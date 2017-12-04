import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LinkNavItem from './LinkNavItem';
import { Navbar, Nav } from 'react-bootstrap';
import Privileged from './Privileged';

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
          <Privileged administrator>
            <LinkNavItem to="/reap/create">
              Criar exercício
            </LinkNavItem>
          </Privileged>
        </Nav>
        <Navbar.Collapse className="right-margin">
          {this.props.name &&
            <Navbar.Text pullRight>
              Boas vindas, {this.props.name}
            </Navbar.Text>
          }
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default connect(state => {
  return {name: state.auth.user ? state.auth.user.name : undefined};
})(NavigationBar);
