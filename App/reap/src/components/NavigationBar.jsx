import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LinkNavItem from './LinkNavItem';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Privileged from './Privileged';
import Auth from '../entities/auth';
import { withEntities } from '../utils';

class NavigationBar extends React.Component {
  handleLogout() {
    this.props.auth.logout();

    window.location.href = "/";
  }

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
        <Privileged>
          <Navbar.Collapse className="pull-right">
            <Navbar.Text>
              Boas vindas, {this.props.name}
            </Navbar.Text>

            <Navbar.Form style={{display: "inline-block"}}>
              <Button onClick={() => this.handleLogout()}>
                Sair
              </Button>
            </Navbar.Form>
          </Navbar.Collapse>
        </Privileged>
      </Navbar>
    )
  }
}

export default connect(state => {
  return {name: state.auth.user ? state.auth.user.name : undefined};
}, withEntities(Auth))(NavigationBar);
