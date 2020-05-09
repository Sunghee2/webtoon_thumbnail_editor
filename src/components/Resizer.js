import React, { useState } from 'react';
import '../styles/Main.scss';

const Resizer = ({ startImgResize, startImgMove, cropperInfo }) => {
  return (
    <div
      role="section"
      className="crop-area"
      style={{
        left: `${cropperInfo.left}px`,
        top: `${cropperInfo.top}px`,
        width: `${cropperInfo.width}px`,
        height: `${cropperInfo.height}px`,
      }}
    >
      <div
        style={{
          left: `${cropperInfo.left}px`,
          top: `${cropperInfo.top}px`,
          width: `${cropperInfo.width}px`,
          height: `${cropperInfo.height}px`,
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

export default Resizer;
