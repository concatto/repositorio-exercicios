import React from 'react';
import { withRouter } from 'react-router-dom';
import { ListGroupItem } from 'react-bootstrap';

const LinkGroupItem = (props) => {
  const { to, children, href, onClick,
    match, location, history, staticContext,
    ...rest} = props;

  const handleClick = event => {
    event.preventDefault();
    history.push(to);
    return false;
  };

  return (
    <ListGroupItem href={to} onClick={e => handleClick(e)} {...rest}>
      {children}
    </ListGroupItem>
  );
}

export default withRouter(LinkGroupItem);
