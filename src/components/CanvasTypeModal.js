import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const getWidthHeight = type => {
  switch (type) {
    case 'horizontal':
      return [640, 360];
    case 'vertical':
      return [400, 300];
    default:
      return [0, 0];
  }
};

const CanvasTypeModal = ({ canvasRef, setCanvasScale }) => {
  const [open, setOpen] = useState(true);
  const [canvasType, setCanvasType] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (!canvasType) return;
    const { offsetLeft, offsetTop } = canvasRef.current;
    const [width, height] = getWidthHeight(canvasType);
    setCanvasScale({
      left: offsetLeft,
      top: offsetTop,
      width,
      height,
    });
    setOpen(false);
  };

  const handleClickButton = e => {
    e.preventDefault();
    setCanvasType(e.target.parentNode.value);
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">썸네일 타입 선택</DialogTitle>
      <DialogContent>
        <Button
          value="horizontal"
          style={{ marginRight: '8px' }}
          variant={canvasType === 'horizontal' ? 'contained' : 'outlined'}
          color="primary"
          onClick={handleClickButton}
        >
          가로형
        </Button>
        <Button
          value="vertical"
          variant={canvasType === 'vertical' ? 'contained' : 'outlined'}
          color="primary"
          onClick={handleClickButton}
        >
          세로형
        </Button>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleSubmit}>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CanvasTypeModal.propTypes = {
  canvasRef: PropTypes.func.isRequired,
  setCanvasScale: PropTypes.func.isRequired,
};

export default CanvasTypeModal;
