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
      const { closeable, ...modalProps } = SpecificModal.modalProperties || {};

      return (
        <Modal key={i} show={modal.shown}
          onExited={() => modalActions.pop(modal.identifier)}
          onHide={() => closeable ? modalActions.close() : {}}
          {...modalProps}
        >
          <SpecificModal {...modal.params}
            onSuccess={modal.callback}
            onDismiss={() => modalActions.close()}
          />
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
