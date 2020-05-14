import React, { useContext } from 'react';
import '../styles/Main.scss';
import propTypes from 'prop-types';
import { ResizerContext } from '../context/ResizerContext';

const Resizer = props => {
  const { startImgResize, startImgMove } = props;
  const [resizer] = useContext(ResizerContext);

  return (
    <div
      // eslint-disable-next-line jsx-a11y/aria-role
      role="section"
      className="crop-area"
      style={{
        left: `${resizer.left}px`,
        top: `${resizer.top}px`,
        width: `${resizer.width}px`,
        height: `${resizer.height}px`,
      }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-label="empty-div"
        style={{
          left: `${resizer.left}px`,
          top: `${resizer.top}px`,
          width: `${resizer.width}px`,
          height: `${resizer.height}px`,
        }}
        onMouseDown={startImgMove}
      />
      <div
        role="button"
        tabIndex={0}
        aria-label="resize from north east"
        className="crop-square-margin ne"
        data-dir="ne"
        onMouseDown={startImgResize}
      />
      <div
        role="button"
        tabIndex={0}
        aria-label="resize from south east"
        className="crop-square-margin se"
        data-dir="se"
        onMouseDown={startImgResize}
      />
      <div
        role="button"
        tabIndex={0}
        aria-label="resize from south west"
        className="crop-square-margin sw"
        data-dir="sw"
        onMouseDown={startImgResize}
      />
      <div
        role="button"
        tabIndex={0}
        aria-label="resize from north west"
        className="crop-square-margin nw"
        data-dir="nw"
        onMouseDown={startImgResize}
      />
    </div>
  );
};

Resizer.propTypes = {
  startImgResize: propTypes.func.isRequired,
  startImgMove: propTypes.func.isRequired,
};

export default Resizer;
