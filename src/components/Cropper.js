import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import '../styles/Main.scss';
import '../styles/Cropper.scss';
import { CropperInfoContext } from '../context';

const Cropper = ({ startCropperResize, startCropperMove, setCanvasScale }) => {
  const { state, dispatch } = useContext(CropperInfoContext);

  useEffect(() => {
    const canvasEl = document.getElementById('editor');
    const { offsetLeft, offsetTop, width, height } = canvasEl;

    setCanvasScale({
      left: offsetLeft,
      top: offsetTop,
      width,
      height,
    });
    dispatch({
      type: 'update',
      offsetLeft,
      offsetTop,
    });
  }, []);

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
  setCanvasScale: propTypes.func.isRequired,
};

export default React.memo(Cropper);
