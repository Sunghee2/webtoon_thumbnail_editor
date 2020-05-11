import React from 'react';
import Modal from '@material-ui/core/Modal';

const CanvasTypeModal = () => {
  return (
    <Modal
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div>
        <h2 id="transition-modal-title">Transition modal</h2>
        <p id="transition-modal-description">react-transition-group animates me.</p>
      </div>
    </Modal>
  );
};

export default CanvasTypeModal;
