import React, { useContext, useState } from 'react';
import PropTypes, { number } from 'prop-types';
import Button from '@material-ui/core/Button';
import { CropperInfoContext } from '../context/CropperInfoContext';
import Cropper from './Cropper';
import Resizer from './Resizer';
import { ResizerContext } from '../context/ResizerContext';

const CanvasContainer = ({
  children,
  cropIsActive,
  applyCropper,
  canvasScale,
  isResize,
  finishResize,
}) => {
  const { state, dispatch } = useContext(CropperInfoContext);
  const [, resizerDispatch] = useContext(ResizerContext);
  const [activeResize, setActiveResize] = useState(false);
  const [direction, setDirection] = useState('');

  const [cropperChange, setCropperChange] = useState({
    prevWidth: 0,
    prevHeight: 0,
    prevX: 0,
    prevY: 0,
    startX: 0,
    startY: 0,
  });

  const getCropperChange = e => {
    return {
      prevWidth: state.width,
      prevHeight: state.height,
      prevX: state.left,
      prevY: state.top,
      startX: e.clientX,
      startY: e.clientY,
    };
  };

  const getDifference = e => {
    return {
      diffX: cropperChange.startX - e.clientX,
      diffY: cropperChange.startY - e.clientY,
    };
  };

  const startCropperResize = e => {
    e.preventDefault();
    setActiveResize(true);
    setDirection(e.target.dataset.dir);
    setCropperChange(getCropperChange(e));
  };

  const cropperResizing = e => {
    e.preventDefault();
    if (activeResize) {
      const { diffX, diffY } = getDifference(e);
      dispatch({ type: direction, diffX, diffY, cropperChange, canvasScale });
      resizerDispatch({ type: direction, diffX, diffY, cropperChange, canvasScale });
    }
  };

  const finishCropperResize = e => {
    e.preventDefault();
    setActiveResize(false);
  };

  const [activeMove, setActiveMove] = useState(false);

  const startCropperMove = e => {
    if (e.target.dataset.dir) return;
    e.preventDefault();
    setActiveMove(true);
    setCropperChange(getCropperChange(e));
  };

  const cropperMoving = e => {
    e.preventDefault();
    if (activeMove) {
      const { diffX, diffY } = getDifference(e);
      dispatch({ type: 'move', diffX, diffY, cropperChange, canvasScale });
      resizerDispatch({ type: 'move', diffX, diffY, cropperChange, canvasScale });
    }
  };

  const finishCropperMove = e => {
    e.preventDefault();
    setActiveMove(false);
  };

  // const [, setActiveImgResize] = useState(false);
  // const [, setActiveImgMove] = useState(false);

  // const [, setIsImgMove] = useState(false);
  // const [cropperInfo] = useState({});

  // const startImgResize = e => {
  //   e.preventDefault();
  //   // setIsResize(true);
  //   setActiveImgResize(true);
  //   setIsImgMove(false);
  //   setActiveImgMove(false);
  //   setDirection(e.target.dataset.dir);
  //   setCropperChange({
  //     prevWidth: cropperInfo.width,
  //     prevHeight: cropperInfo.height,
  //     prevX: cropperInfo.left,
  //     prevY: cropperInfo.top,
  //     startX: e.clientX,
  //     startY: e.clientY,
  //   });
  // };

  // const startImgMove = e => {
  //   e.preventDefault();
  //   setIsImgMove(true);
  //   setActiveImgMove(true);
  //   setCropperChange({
  //     prevWidth: cropperInfo.width,
  //     prevHeight: cropperInfo.height,
  //     prevX: cropperInfo.left,
  //     prevY: cropperInfo.top,
  //     startX: e.clientX,
  //     startY: e.clientY,
  //   });
  // };

  return (
    <div
      role="button"
      tabIndex={0}
      onMouseMove={e => {
        cropperResizing(e);
        cropperMoving(e);
      }}
      onMouseUp={e => {
        finishCropperResize(e);
        finishCropperMove(e);
      }}
      style={{ position: 'relative', width: canvasScale.width, height: canvasScale.height }}
    >
      {children}
      {cropIsActive && (
        <>
          <Cropper startCropperResize={startCropperResize} startCropperMove={startCropperMove} />
          <Button color="primary" onClick={applyCropper}>
            적용하기
          </Button>
        </>
      )}
      {isResize && (
        <>
          <Resizer startImgResize={startCropperResize} startImgMove={startCropperMove} />
          <Button color="primary" onClick={finishResize}>
            완료
          </Button>
        </>
      )}
    </div>
  );
};

CanvasContainer.propTypes = {
  children: PropTypes.element.isRequired,
  cropIsActive: PropTypes.bool.isRequired,
  applyCropper: PropTypes.func.isRequired,
  canvasScale: PropTypes.objectOf(number).isRequired,
  isResize: PropTypes.bool.isRequired,
  finishResize: PropTypes.func.isRequired,
};

export default CanvasContainer;
