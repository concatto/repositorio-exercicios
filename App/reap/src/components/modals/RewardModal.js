import React from 'react';
import { Modal } from 'react-bootstrap';
import ModalFooter from '../ModalFooter';

class RewardModal extends React.Component {
  render() {
    const { onSuccess } = this.props;

    return (
      <div>
        <Modal.Header>
          <Modal.Title>Parabéns!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Você ganhou mil barras de outro que valem mais do que dinheiro.</p>
        </Modal.Body>
        <ModalFooter confirm="Continuar" onSuccess={onSuccess}/>
      </div>
    );
  }
}

RewardModal.modalProperties = {
  closeable: false
};

export default RewardModal;
