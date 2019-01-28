import React from 'react';
import { Modal } from 'react-bootstrap';
import ModalFooter from '../ModalFooter';
import TestCases from '../TestCases';

class FailureModal extends React.Component {
  render() {
    const { onSuccess, content, exercise } = this.props;
    const okCount = content.filter(el => el.ok).length;

    return (
      <div>
        <Modal.Header>
          <Modal.Title>Solução incorreta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Infelizmente, sua solução foi analisada e obteve êxito em {okCount} dos {content.length} casos
           de teste registrados pelo criador do exercício.</p>
          <br/>
          <TestCases title={`#${exercise.id} - ${exercise.name}`} cases={content}/>
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
