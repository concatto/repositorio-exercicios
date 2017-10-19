import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withEntities } from '../utils';
import ModalEntity from '../entities/modal';

class ModalRoot extends React.Component {
  render() {
    const modalActions = this.props.modal;

    const renderedModals = this.props.modalState.stack.map((modal, i) => {
      const SpecificModal = modal.component;

      return (
        <Modal key={i} show={modal.shown}
          onExited={() => modalActions.pop()}
          onHide={() => modalActions.close()}
        >
          <SpecificModal {...modal.params} onSuccess={modal.callback}/>
        </Modal>
      );
    });

    return (
      <div>
        {renderedModals}
      </div>
    );
  }
}

export default connect((state) => {
  return {modalState: state.modal};
}, withEntities(ModalEntity))(ModalRoot);
