import React, { useContext } from 'react';
import propTypes from 'prop-types';
import '../styles/Main.scss';
import '../styles/Cropper.scss';
import { CropperInfoContext } from '../context/CropperInfoContext';

const Cropper = ({ startCropperResize, startCropperMove }) => {
  const { state } = useContext(CropperInfoContext);
  console.log('state', state);
  return (
    <div
      role="button"
      tabIndex={0}
      className="crop-area"
      style={{
        left: `${state.left}px`,
        top: `${state.top}px`,
        width: `${state.width}px`,
        height: `${state.height}px`,
      }}
      onMouseDown={startCropperMove}
    >
      <div
        role="button"
        tabIndex={0}
        aria-label="resize from north east"
        className="crop-square-margin ne"
        data-dir="ne"
        onMouseDown={startCropperResize}
      />
      <div
        role="button"
        tabIndex={0}
        aria-label="resize from south east"
        className="crop-square-margin se"
        data-dir="se"
        onMouseDown={startCropperResize}
      />
      <div
        role="button"
        tabIndex={0}
        aria-label="resize from south west"
        className="crop-square-margin sw"
        data-dir="sw"
        onMouseDown={startCropperResize}
      />
      <div
        role="button"
        tabIndex={0}
        aria-label="resize from north west"
        className="crop-square-margin nw"
        data-dir="nw"
        onMouseDown={startCropperResize}
      />
    </div>
  );
};

Cropper.propTypes = {
  startCropperResize: propTypes.func.isRequired,
  startCropperMove: propTypes.func.isRequired,
};

export default Cropper;
