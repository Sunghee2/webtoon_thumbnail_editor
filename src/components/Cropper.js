import React, { useContext, useRef, useEffect } from 'react';
import propTypes, { number } from 'prop-types';
import '../styles/Main.scss';
import '../styles/Cropper.scss';
import { CropperInfoContext } from '../context';

const Cropper = ({
  startCropperResize,
  startCropperMove,
  nextCropper,
  activeMove,
  setCanvasScale,
}) => {
  const { state, dispatch } = useContext(CropperInfoContext);
  const areaRef = useRef(null);
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

  useEffect(() => {
    if (activeMove) {
      areaRef.current.style.left = `${nextCropper.x}px`;
      areaRef.current.style.top = `${nextCropper.y}px`;
    } else {
      areaRef.current.style.left = `${state.left}px`;
      areaRef.current.style.top = `${state.top}px`;
    }
  }, [nextCropper, state]);

  return (
    <div
      ref={areaRef}
      role="button"
      tabIndex={0}
      className="crop-area"
      style={{
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
  nextCropper: propTypes.objectOf(number).isRequired,
  activeMove: propTypes.bool.isRequired,
  setCanvasScale: propTypes.func.isRequired,
};

export default React.memo(Cropper);
