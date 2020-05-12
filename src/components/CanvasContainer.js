import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { CropperInfoContext } from '../context/CropperInfoContext';
import Cropper from './Cropper';

const CanvasContainer = ({ children, cropIsActive }) => {
  const [cropperInfo, setCropperInfo] = useContext(CropperInfoContext);
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
      prevWidth: cropperInfo.width,
      prevHeight: cropperInfo.height,
      prevX: cropperInfo.left,
      prevY: cropperInfo.top,
      startX: e.clientX,
      startY: e.clientY,
    });
  };
  const [diff, setDiff] = useState({ x: 0, y: 0 });
  const cropperResizing = e => {
    e.preventDefault();
    if (activeResize) {
      setDiff({ x: cropperChange.startX - e.clientX, y: cropperChange.startY - e.clientY });
    }
  };
  const finishResize = e => {
    e.preventDefault();
    setActiveResize(false);
  };
  return (
    <div role="button" tabIndex={0} onMouseMove={cropperResizing} onMouseUp={finishResize}>
      {children}
      {cropIsActive && (
        <Cropper
          startResize={startResize}
          cropperChange={cropperChange}
          diff={diff}
          direction={direction}
        />
      )}
    </div>
  );
};

CanvasContainer.propTypes = {
  children: PropTypes.elementType.isRequired,
  cropIsActive: PropTypes.bool.isRequired,
};

export default CanvasContainer;
