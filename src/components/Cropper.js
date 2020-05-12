import React, { useContext, useEffect } from 'react';
import propTypes, { number } from 'prop-types';
import '../styles/Main.scss';
import '../styles/Cropper.scss';
import { CropperInfoContext } from '../context/CropperInfoContext';

const Cropper = ({ startResize, diff, cropperChange, direction }) => {
  const [cropperInfo, setCropperInfo] = useContext(CropperInfoContext);
  useEffect(() => {
    const { prevWidth, prevHeight, prevX, prevY } = cropperChange;
    switch (direction) {
      case 'se':
        setCropperInfo(prev => ({
          ...prev,
          width: prevWidth - diff.x,
          height: prevHeight - diff.y,
        }));
        break;
      case 'ne':
        setCropperInfo(prev => ({
          ...prev,
          top: prevY - diff.y,
          width: prevWidth - diff.x,
          height: prevHeight + diff.y,
        }));
        break;
      case 'sw':
        setCropperInfo(prev => ({
          ...prev,
          left: prevX - diff.x,
          width: prevWidth + diff.x,
          height: prevHeight - diff.y,
        }));
        break;
      case 'nw':
        setCropperInfo({
          top: prevY - diff.y,
          left: prevX - diff.x,
          width: prevWidth + diff.x,
          height: prevHeight + diff.y,
        });
        break;
      default:
        break;
    }
  }, [diff]);
  return (
    <div
      role="button"
      tabIndex={0}
      className="crop-area"
      style={{
        left: `${cropperInfo.left}px`,
        top: `${cropperInfo.top}px`,
        width: `${cropperInfo.width}px`,
        height: `${cropperInfo.height}px`,
      }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-label="resize from north east"
        className="crop-square-margin ne"
        data-dir="ne"
        onMouseDown={startResize}
      />
      <div
        role="button"
        tabIndex={0}
        aria-label="resize from south east"
        className="crop-square-margin se"
        data-dir="se"
        onMouseDown={startResize}
      />
      <div
        role="button"
        tabIndex={0}
        aria-label="resize from south west"
        className="crop-square-margin sw"
        data-dir="sw"
        onMouseDown={startResize}
      />
      <div
        role="button"
        tabIndex={0}
        aria-label="resize from north west"
        className="crop-square-margin nw"
        data-dir="nw"
        onMouseDown={startResize}
      />
    </div>
  );
};

Cropper.propTypes = {
  startResize: propTypes.func.isRequired,
  diff: propTypes.objectOf(number).isRequired,
  cropperChange: propTypes.objectOf(number).isRequired,
  direction: propTypes.string.isRequired,
};

export default Cropper;
