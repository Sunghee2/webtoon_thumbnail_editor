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
  const startResize = e => {
    e.preventDefault();
    setActiveResize(true);
    setDirection(e.target.dataset.dir);
    setCropperChange({
      prevWidth: state.width,
      prevHeight: state.height,
      prevX: state.left,
      prevY: state.top,
      startX: e.clientX,
      startY: e.clientY,
    });
  };
  const cropperResizing = e => {
    e.preventDefault();
    if (activeResize) {
      const diffX = cropperChange.startX - e.clientX;
      const diffY = cropperChange.startY - e.clientY;
      dispatch({ type: direction, diffX, diffY, cropperChange });
    }
  };
  const finishResize = e => {
    e.preventDefault();
    setActiveResize(false);
  };
  return (
    <div role="button" tabIndex={0} onMouseMove={cropperResizing} onMouseUp={finishResize}>
      {children}
      {cropIsActive && <Cropper startResize={startResize} />}
    </div>
  );
};

CanvasContainer.propTypes = {
  children: PropTypes.elementType.isRequired,
  cropIsActive: PropTypes.bool.isRequired,
};

export default CanvasContainer;
