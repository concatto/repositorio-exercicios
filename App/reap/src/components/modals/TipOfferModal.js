import React from 'react';
import { Modal } from 'react-bootstrap';
import ModalFooter from '../ModalFooter';

class TipOfferModal extends React.Component {
  render() {
    const { onSuccess, onDismiss } = this.props;

    return (
      <div className="tip-modal">
        <Modal.Header>
          <Modal.Title>Solução incorreta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Restam 4 das 5 dicas disponíveis para este exercício. Deseja revelar uma dica?</p>
          <p>Revelar uma dica custará <strong>10</strong> dos <strong>30</strong> pontos deste exercício.</p>
        </Modal.Body>
        <ModalFooter confirm="Aceitar" cancel="Rejeitar"
          onDismiss={onDismiss}
          onSuccess={onSuccess}
        />
      </div>
    );
  }
}

export default TipOfferModal;
