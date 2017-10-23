import React from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';
import ModalFooter from '../ModalFooter';

class RewardModal extends React.Component {
  render() {
    const { onDismiss } = this.props;

    return (
      <div>
        <Modal.Header>
          <Modal.Title>Parabéns!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="centralize">
            <h5>Resolvendo #31 - Sequência de Fibonacci, você obteve</h5>
            <div className="reward smaller">
              <h1>20</h1>
            </div>
            <h5>pontos!</h5>
            <br/>
            <h5>20 pontos restantes para o nível 3</h5>
            <ProgressBar bsStyle="success" now={80}/>
          </div>
        </Modal.Body>
        <ModalFooter confirm="Continuar" onSuccess={onDismiss} link="/reap"/>
      </div>
    );
  }
}

RewardModal.modalProperties = {
  closeable: false
};

export default RewardModal;
