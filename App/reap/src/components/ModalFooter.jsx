import React from 'react';
import LinkButton from './LinkButton';
import { Modal, Button } from 'react-bootstrap';

export default class ModalFooter extends React.Component {
  createConfirmButton() {
    const { link, confirm, onSuccess = () => {}} = this.props;

    if (!confirm) {
      return null;
    }

    const content = typeof(confirm) === "string" ? confirm : "Confirmar";

    const buttonProps = {
      onClick: () => onSuccess(),
      bsStyle: "success"
    };

    if (link) {
      return (
        <LinkButton to={link} {...buttonProps}>
          {content}
        </LinkButton>
      );
    } else {
      return (
        <Button {...buttonProps}>
          {content}
        </Button>
      );
    }
  }

  render() {
    const {
      onDismiss = () => {},
      cancel
    } = this.props;

    return (
      <Modal.Footer>
        {cancel &&
          <Button onClick={() => onDismiss()}>
            {typeof(cancel) === "string" ? cancel : "Cancelar"}
          </Button>
        }
        {this.createConfirmButton()}
      </Modal.Footer>
    )
  }
}
