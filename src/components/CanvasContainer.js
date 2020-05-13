import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { CropperInfoContext } from '../context/CropperInfoContext';
import Cropper from './Cropper';

const CanvasContainer = ({ children, cropIsActive }) => {
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
  const startResize = e => {
    e.preventDefault();
    setActiveResize(true);
    setDirection(e.target.dataset.dir);
    setCropperChange(getCropperChange(e));
  };
  const cropperResizing = e => {
    e.preventDefault();
    if (activeResize) {
      const { diffX, diffY } = getDifference(e);
      dispatch({ type: direction, diffX, diffY, cropperChange });
    }
  };
  const finishResize = e => {
    e.preventDefault();
    setActiveResize(false);
  };
  const [activeMove, setActiveMove] = useState(false);
  const startMove = e => {
    if (e.target.dataset.dir) return;
    e.preventDefault();
    setActiveMove(true);
    setCropperChange(getCropperChange(e));
  };
  const moving = e => {
    e.preventDefault();
    if (activeMove) {
      const { diffX, diffY } = getDifference(e);
      dispatch({ type: 'move', diffX, diffY, cropperChange });
    }
  };
  const finishMove = e => {
    e.preventDefault();
    setActiveMove(false);
  };
  return (
    <div
      role="button"
      tabIndex={0}
      onMouseMove={cropperResizing}
      onMouseUp={e => {
        finishResize(e);
        finishMove(e);
      }}
    >
      {children}
      {cropIsActive && <Cropper startResize={startResize} startMove={startMove} moving={moving} />}
    </div>
  );
};

CanvasContainer.propTypes = {
  children: PropTypes.element.isRequired,
  cropIsActive: PropTypes.bool.isRequired,
};

export default CanvasContainer;
