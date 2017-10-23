import React from 'react';
import { Modal } from 'react-bootstrap';
import ModalFooter from '../ModalFooter';

class FailureModal extends React.Component {
  render() {
    const { onSuccess } = this.props;

    return (
      <div>
        <Modal.Header>
          <Modal.Title>Solução incorreta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Infelizmente, sua solução foi analisada e falhou em 2 dos 4
           casos de teste registrados pelo criador do exercício.</p>
        </Modal.Body>
        <ModalFooter confirm="Continuar" onSuccess={onSuccess}/>
      </div>
    );
  }
}

FailureModal.modalProperties = {
  closeable: false
};

export default FailureModal;
