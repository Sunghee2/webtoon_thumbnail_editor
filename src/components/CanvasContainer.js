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
  const [prevCropper, setPrevCropper] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [clientStart, setClientStart] = useState({
    x: 0,
    y: 0,
  });
  const [nextCropper, setNextCropper] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const getRightSize = (current, min) => {
    if (current < min) {
      return min;
    }
    let max = canvasScale.height + canvasScale.top - state.top;
    if (state.isWide) {
      max = (max * 16) / 9;
      return Math.min(current, max);
    }
    max = (max * 3) / 4;
    return Math.min(current, max);
  };
  const getRightPos = (current, min, max) => {
    if (current < min) {
      return min;
    }
    return Math.min(current, max);
  };

  const [cropSize, setCropSize] = useState('wide');
  const changeCropSize = e => {
    e.preventDefault();
    if (e.target.value === 'wide') {
      setCropSize('wide');
      dispatch({ type: 'wide' });
    } else {
      setCropSize('tall');
      const nextW = getRightSize((state.width * 4) / 3, 20, canvasScale.height);
      if (nextW + state.top > canvasScale.height) {
        const changeY = canvasScale.height + canvasScale.top - nextW;
        dispatch({ type: 'tall', changeY });
      } else {
        dispatch({ type: 'tall' });
      }
    }
  };

  const getCropperChange = e => {
    setPrevCropper({
      width: state.width,
      height: state.height,
      x: state.left,
      y: state.top,
    });
    setClientStart({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const getDifference = e => {
    return {
      diffX: clientStart.x - e.clientX,
      diffY: clientStart.y - e.clientY,
    };
  };

  const getNextPosition = e => {
    const { diffX, diffY } = getDifference(e);
    const nextX = getRightPos(
      prevCropper.x - diffX,
      canvasScale.left,
      canvasScale.width + canvasScale.left - state.width,
    );
    const nextY = getRightPos(
      prevCropper.y - diffY,
      canvasScale.top,
      canvasScale.height + canvasScale.top - prevCropper.height,
    );
    setNextCropper(prev => ({ ...prev, x: nextX, y: nextY }));
  };
  const getNextSize = e => {
    const { diffX, diffY } = getDifference(e);
    let nextWidth;
    let nextHeight;
    if (direction === 'se' || direction === 'ne') {
      nextWidth = getRightSize(prevCropper.width - diffX, 20, canvasScale.width - prevCropper.x);
      nextHeight = getRightSize(prevCropper.height - diffY, 20, canvasScale.height - prevCropper.y);
    } else {
      nextWidth = getRightSize(prevCropper.width + diffX, 20, canvasScale.width - prevCropper.x);
      nextHeight = getRightSize(prevCropper.height + diffY, 20, canvasScale.height - state.top);
    }
    setNextCropper(prev => ({ ...prev, width: nextWidth, height: nextHeight }));
  };

  const startCropperResize = e => {
    e.preventDefault();
    setActiveResize(true);
    setDirection(e.target.dataset.dir);
    getCropperChange(e);
  };

  const cropperResizing = e => {
    e.preventDefault();
    if (activeResize) {
      getNextPosition(e);
      getNextSize(e);
      dispatch({
        type: direction,
        nextCropper,
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
    getCropperChange(e);
  };

  const cropperMoving = e => {
    e.preventDefault();
    if (activeMove) {
      getNextPosition(e);
      dispatch({ type: 'move', nextCropper });
    }
  };

  const finishCropperMove = e => {
    e.preventDefault();
    setActiveMove(false);
  };

  return (
    <>
      {cropIsActive && (
        <FormControl component="fieldset">
          <RadioGroup value={cropSize} onChange={changeCropSize}>
            <FormControlLabel
              value="wide"
              control={<Radio className="naver-colored-button" />}
              label="가로형"
            />
            <FormControlLabel
              value="tall"
              control={<Radio className="naver-colored-button" />}
              label="세로형"
            />
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
