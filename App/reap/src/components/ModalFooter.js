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

    if (link) {
      return (
        <LinkButton to={link} onClick={() => onSuccess()}>
          {content}
        </LinkButton>
      );
    } else {
      return (
        <Button onClick={() => onSuccess()}>
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
