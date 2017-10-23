import React from 'react';
import { Modal } from 'react-bootstrap';
import ModalFooter from '../ModalFooter';

class SuccessModal extends React.Component {
  render() {
    const { onSuccess } = this.props;

    return (
      <div>
        <Modal.Header>
          <Modal.Title>Parabéns!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Seu código está correto.</p>
        </Modal.Body>
        <ModalFooter confirm="Continuar" onSuccess={onSuccess}/>
      </div>
    );
  }
}

SuccessModal.modalProperties = {
  closeable: false
};

export default SuccessModal;
