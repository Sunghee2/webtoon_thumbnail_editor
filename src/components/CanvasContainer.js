import React, { useContext, useState } from 'react';
import PropTypes, { number } from 'prop-types';
import '../styles/Cropper.scss';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { CropperInfoContext } from '../context';
import Cropper from './Cropper';

const CanvasContainer = ({ children, cropIsActive, applyCropper, canvasScale }) => {
  const { state, dispatch } = useContext(CropperInfoContext);
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

  const getRightSize = (current, min, max) => {
    if (current < min) {
      return min;
    }
    return Math.min(current, max);
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
      const nextX = getRightSize(
        cropperChange.prevX - diffX,
        canvasScale.left,
        cropperChange.prevX + cropperChange.prevWidth,
      );
      const nextY = getRightSize(
        cropperChange.prevY - diffY,
        canvasScale.top,
        cropperChange.prevY + cropperChange.prevHeight,
      );
      const nextWidth = getRightSize(cropperChange.prevWidth - diffX, 20, canvasScale.width);
      const nextHeight = getRightSize(cropperChange.prevHeight - diffY, 20, canvasScale.height);
      const nextWidthReverse = getRightSize(cropperChange.prevWidth + diffX, 20, canvasScale.width);
      const nextHeightReverse = getRightSize(
        cropperChange.prevHeight + diffY,
        20,
        canvasScale.height,
      );
      dispatch({
        type: direction,
        nextX,
        nextY,
        nextWidth,
        nextHeight,
        nextWidthReverse,
        nextHeightReverse,
      });
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
      const nextX = getRightSize(
        cropperChange.prevX - diffX,
        canvasScale.left,
        cropperChange.prevX + cropperChange.prevWidth,
      );
      const nextY = getRightSize(
        cropperChange.prevY - diffY,
        canvasScale.top,
        cropperChange.prevY + cropperChange.prevHeight,
      );
      dispatch({ type: 'move', nextX, nextY });
    }
  };

  const finishCropperMove = e => {
    e.preventDefault();
    setActiveMove(false);
  };

  const [cropSize, setCropSize] = useState('wide');
  const changeCropSize = e => {
    e.preventDefault();
    if (e.target.value === 'wide') {
      setCropSize('wide');
      dispatch({ type: 'wide' });
    } else {
      setCropSize('tall');
      dispatch({ type: 'tall' });
    }
  };

  return (
    <>
      {cropIsActive && (
        <FormControl component="fieldset">
          <RadioGroup value={cropSize} onChange={changeCropSize}>
            <FormControlLabel value="wide" control={<Radio />} label="가로형" />
            <FormControlLabel value="tall" control={<Radio />} label="세로형" />
          </RadioGroup>
        </FormControl>
      )}
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
        className="cropper-container"
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
      </div>
    </>
  );
};

CanvasContainer.propTypes = {
  children: PropTypes.element.isRequired,
  cropIsActive: PropTypes.bool.isRequired,
  applyCropper: PropTypes.func.isRequired,
  canvasScale: PropTypes.objectOf(number).isRequired,
};

export default CanvasContainer;
