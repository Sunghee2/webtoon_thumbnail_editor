import React, { useState } from 'react';
import '../styles/Main.scss';
import '../styles/Cropper.scss';

const Cropper = ({ canvasScale }) => {
  console.log(canvasScale);

  const [cropperInfo, setCropperInfo] = useState({
    top: canvasScale.top,
    left: canvasScale.left,
    width: canvasScale.width,
    height: canvasScale.height,
  });

  return (
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
  );
};

export default Cropper;
