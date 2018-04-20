import React from 'react';
import { withRouter } from 'react-router';
import { Button } from 'react-bootstrap';

class LinkButton extends React.Component {
  handleClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }

    e.preventDefault();
    this.props.history.push(this.props.to);
  }

  render() {
    const { to, onClick, children, match, location, history, staticContext, ...others } = this.props;

    return (
      <Button onClick={e => this.handleClick(e)} {...others} href={to}>
        {children}
      </Button>
    );
  }
}

export default withRouter(LinkButton);
