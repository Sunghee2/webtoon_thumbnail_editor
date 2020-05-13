import React, { useContext } from 'react';
import propTypes from 'prop-types';
import '../styles/Main.scss';
import '../styles/Cropper.scss';
import { CropperInfoContext } from '../context/CropperInfoContext';

const Cropper = ({ startResize }) => {
  const { state } = useContext(CropperInfoContext);
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
};

export default Cropper;
