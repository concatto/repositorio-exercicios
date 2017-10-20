import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class ModalFooter extends React.Component {
  render() {
    const {
      onDismiss = () => {},
      onSuccess = () => {},
      cancel, confirm
    } = this.props;

    return (
      <Modal.Footer>
        {cancel &&
          <Button onClick={() => onDismiss()}>
            {typeof(cancel) === "string" ? cancel : "Cancelar"}
          </Button>
        }
        {confirm &&
          <Button onClick={() => onSuccess()}>
            {typeof(confirm) === "string" ? confirm : "Confirmar"}
          </Button>
        }
      </Modal.Footer>
    )
  }
}
