import React from 'react';
import { Modal } from 'react-bootstrap';
import ModalFooter from '../ModalFooter';
import TestCases from '../TestCases';

class FailureModal extends React.Component {
  render() {
    const { onSuccess } = this.props;
    const testCases = [
      {input: "4", output: "3", ok: true},
      {input: "6", output: "8", ok: false},
      {input: "8", output: "21", ok: false},
      {input: "9", output: "34", ok: true},
    ];

    return (
      <div>
        <Modal.Header>
          <Modal.Title>Solução incorreta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Infelizmente, sua solução foi analisada e falhou em 2 dos 4
            casos de teste registrados pelo criador do exercício.</p>
          <br/>
          <TestCases title="#031 - Sequência de Fibonacci" cases={testCases} okColumn={true}/>
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
