import React from 'react';
import propTypes from 'prop-types';
import '../styles/Main.scss';
import '../styles/Cropper.scss';

const Cropper = ({ cropperInfo, startResize }) => {
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
  cropperInfo: propTypes.objectOf().isRequired,
  startResize: propTypes.func.isRequired,
};

export default Cropper;
