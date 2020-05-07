import React, { useState } from 'react';
import '../styles/Main.scss';
import '../styles/Cropper.scss';

const Cropper = ({ canvasScale }) => {
  const [cropperInfo, setCropperInfo] = useState({
    ...canvasScale,
  });
  const [cropperChange, setCropperChange] = useState({
    prevWidth: 0,
    prevHeight: 0,
    prevX: 0,
    prevY: 0,
    startX: 0,
    startY: 0,
  });

  const [activeResize, setActiveResize] = useState(false);
  const startResize = e => {
    e.preventDefault();
    setActiveResize(true);
    setCropperChange({
      prevWidth: cropperInfo.width,
      prevHeight: cropperInfo.height,
      prevX: cropperInfo.left,
      prevY: cropperInfo.top,
      startX: e.clientX,
      startY: e.clientY,
    });
  };
  const resizing = e => {
    e.preventDefault();
    const { dir } = e.target.dataset;
    let diffX = 0;
    let diffY = 0;
    diffX = cropperChange.startX - e.clientX;
    diffY = cropperChange.startY - e.clientY;
    if (activeResize) {
      switch (dir) {
        case 'se':
          setCropperInfo(prev => ({
            ...prev,
            width: cropperChange.prevWidth - diffX,
            height: cropperChange.prevHeight - diffY,
          }));
          break;
        case 'ne':
          console.log(cropperChange, diffY);
          setCropperInfo(prev => ({
            ...prev,
            top: cropperChange.prevY - diffY,
            width: cropperChange.prevWidth - diffX,
            height: cropperChange.prevHeight + diffY,
          }));
          break;
        default:
          console.log('default');
      }
    }
  };
  const finishResize = e => {
    e.preventDefault();
    console.log(cropperInfo);
    setActiveResize(false);
  };
  return (
    <div
      className="crop-area"
      style={{
        left: `${cropperInfo.left}px`,
        top: `${cropperInfo.top}px`,
        width: `${cropperInfo.width}px`,
        height: `${cropperInfo.height}px`,
      }}
      onMouseUp={finishResize}
    >
      <div
        className="crop-square-margin ne"
        data-dir="ne"
        onMouseDown={startResize}
        onMouseMove={resizing}
      />
      <div
        className="crop-square-margin se"
        data-dir="se"
        onMouseDown={startResize}
        onMouseMove={resizing}
      />
      <div className="crop-square-margin sw" />
      <div className="crop-square-margin nw" />
    </div>
  );
};

export default Cropper;
