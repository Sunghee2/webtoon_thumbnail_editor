import React, { useState } from 'react';
import '../styles/Main.scss';

const Cropper = ({ cropIsActive, canvasScale }) => {
  const [cropperInfo, setCropperInfo] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  useEffect(() => {
    setCropperInfo({
      top: canvasScale.top,
      left: canvasScale.left,
      width: canvasScale.width,
      height: canvasScale.height,
    });
  }, [canvasScale]);

  return cropIsActive ? (
    <div
      className="crop-area"
      style={{
        left: `${cropperInfo.left}px`,
        top: `${cropperInfo.top}px`,
        width: `${cropperInfo.width}px`,
        height: `${cropperInfo.height}px`,
      }}
    >
      <div className="crop-square-margin ne" />
      <div className="crop-square-margin se" />
      <div className="crop-square-margin sw" />
      <div className="crop-square-margin nw" />
    </div>
  ) : null;
};

export default Cropper;
