import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CropperInfoContext } from '../context/CropperInfoContext';
import Cropper from './Cropper';

const CanvasContainer = ({
  children,
  cropIsActive,
  activeResize,
  startResize,
  direction,
  cropperChange,
}) => {
  const [cropperInfo, setCropperInfo] = useContext(CropperInfoContext);
  const cropperResizing = e => {
    e.preventDefault();
    const diffX = cropperChange.startX - e.clientX;
    const diffY = cropperChange.startY - e.clientY;
    const { prevWidth, prevHeight, prevX, prevY } = cropperChange;
    if (activeResize) {
      switch (direction) {
        case 'se':
          setCropperInfo(prev => ({
            ...prev,
            width: prevWidth - diffX,
            height: prevHeight - diffY,
          }));
          break;
        case 'ne':
          setCropperInfo(prev => ({
            ...prev,
            top: prevY - diffY,
            width: prevWidth - diffX,
            height: prevHeight + diffY,
          }));
          break;
        case 'sw':
          setCropperInfo(prev => ({
            ...prev,
            left: prevX - diffX,
            width: prevWidth + diffX,
            height: prevHeight - diffY,
          }));
          break;
        case 'nw':
          setCropperInfo({
            top: prevY - diffY,
            left: prevX - diffX,
            width: prevWidth + diffX,
            height: prevHeight + diffY,
          });
          break;
        default:
          break;
      }
    }
  };
  return (
    <div onMouseMove={cropperResizing}>
      {children}
      {cropIsActive && <Cropper startResize={startResize} cropperInfo={cropperInfo} />}
    </div>
  );
};

CanvasContainer.propTypes = {
  children: PropTypes.elementType.isRequired,
  cropIsActive: PropTypes.bool.isRequired,
  activeResize: PropTypes.bool.isRequired,
  startResize: PropTypes.func.isRequired,
  direction: PropTypes.string.isRequired,
  cropperChange: PropTypes.objectOf().isRequired,
};

export default CanvasContainer;
