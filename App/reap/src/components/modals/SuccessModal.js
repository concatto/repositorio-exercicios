import React from 'react';
import { Modal } from 'react-bootstrap';
import ModalFooter from '../ModalFooter';
import TestCases from '../TestCases';

class SuccessModal extends React.Component {
  render() {
    const { onSuccess } = this.props;
    const testCases = [
      {input: "4", output: "3", ok: true},
      {input: "6", output: "8", ok: true},
      {input: "8", output: "21", ok: true},
      {input: "9", output: "34", ok: true},
    ];

    return (
      <div>
        <Modal.Header>
          <Modal.Title>Solução correta!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Parabéns! Sua solução foi analisada e obedeceu com êxito todos
            os casos de teste registrados pelo criador do exercício.</p>
          <br/>
          <TestCases title="#031 - Sequência de Fibonacci" cases={testCases} okColumn={true}/>
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
