import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const CanvasTypeModal = props => {
  const [open, setOpen] = useState(true);
  const [canvasType, setCanvasType] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (canvasType === null) return;
    const { offsetLeft, offsetTop } = props.canvasRef.current;
    console.log('size', props.canvasRef.current.parentNode.parentNode.offsetHeight);
    const [width, height] =
      canvasType === 'horizontal' ? [640, 360] : canvasType === 'vertical' ? [400, 300] : [0, 0];
    props.setCanvasScale({
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

export default CanvasTypeModal;
