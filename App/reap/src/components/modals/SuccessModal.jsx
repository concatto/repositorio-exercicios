import React from 'react';
import { Modal } from 'react-bootstrap';
import ModalFooter from '../ModalFooter';
import TestCases from '../TestCases';

class SuccessModal extends React.Component {
  render() {
    const { onSuccess, content, exercise } = this.props;

    return (
      <div>
        <Modal.Header>
          <Modal.Title>Solução correta!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Parabéns! Sua solução foi analisada e obedeceu com êxito todos
            os casos de teste registrados pelo criador do exercício.</p>
          <br/>
          <TestCases title={`#${exercise.id} - ${exercise.name}`} cases={content}/>
          <p>Clique em "Continuar" para receber sua merecida recompensa!</p>
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
