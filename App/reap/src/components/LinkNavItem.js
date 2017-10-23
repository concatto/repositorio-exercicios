import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class LinkNavItem extends React.Component {
  render() {
    const {
      to, match, children, location, history,
      activeKey, activeHref, staticContext, ...rest
    } = this.props;

    const active = to === location.pathname;

    return (
      <li className={active ? "active" : ""} {...rest}>
        <Link to={to}>
          {children}
        </Link>
      </li>
    );
  }
}

export default withRouter(LinkNavItem);
