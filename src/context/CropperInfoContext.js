import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
};
const getRightSize = (current, min, max) => {
  if (current < 0) {
    return min;
  }
  return Math.min(current, max);
};
const reducer = (state, action) => {
  const {
    type,
    offsetTop,
    offsetLeft,
    width,
    height,
    cropperChange,
    diffX,
    diffY,
    canvasScale,
  } = action;

  switch (type) {
    case 'init':
      return {
        left: offsetLeft,
        top: offsetTop,
        width,
        height,
      };
    case 'se':
      return {
        ...state,
        width: getRightSize(
          cropperChange.prevWidth - diffX,
          10,
          canvasScale.width - cropperChange.prevX,
        ),
        height: getRightSize(
          cropperChange.prevHeight - diffY,
          10,
          canvasScale.height - cropperChange.prevY,
        ),
      };
    case 'ne':
      return {
        ...state,
        top: getRightSize(
          cropperChange.prevY - diffY,
          0,
          cropperChange.prevY + cropperChange.prevHeight,
        ),
        width: getRightSize(
          cropperChange.prevWidth - diffX,
          10,
          canvasScale.width - cropperChange.prevX,
        ),
        height: getRightSize(
          cropperChange.prevHeight + diffY,
          10,
          cropperChange.prevY + cropperChange.prevHeight,
        ),
      };
    case 'sw':
      return {
        ...state,
        left: getRightSize(
          cropperChange.prevX - diffX,
          0,
          cropperChange.prevX + cropperChange.prevWidth,
        ),
        width: getRightSize(
          cropperChange.prevWidth + diffX,
          10,
          cropperChange.prevX + cropperChange.prevWidth,
        ),
        height: getRightSize(
          cropperChange.prevHeight - diffY,
          10,
          canvasScale.height - cropperChange.prevY,
        ),
      };
    case 'nw':
      return {
        top: getRightSize(
          cropperChange.prevY - diffY,
          0,
          cropperChange.prevY + cropperChange.prevHeight,
        ),
        left: getRightSize(
          cropperChange.prevX - diffX,
          0,
          cropperChange.prevX + cropperChange.prevWidth,
        ),
        width: getRightSize(
          cropperChange.prevWidth + diffX,
          10,
          cropperChange.prevX + cropperChange.prevWidth,
        ),
        height: getRightSize(
          cropperChange.prevHeight + diffY,
          10,
          cropperChange.prevHeight + cropperChange.prevY,
        ),
      };
    case 'move':
      return {
        ...state,
        top: getRightSize(
          cropperChange.prevY - diffY,
          0,
          canvasScale.height - cropperChange.prevHeight,
        ),
        left: getRightSize(
          cropperChange.prevX - diffX,
          0,
          canvasScale.width - cropperChange.prevWidth,
        ),
      };
    default:
      return initialState;
  }
};

const CropperInfoContext = createContext(initialState);
const CropperInfoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CropperInfoContext.Provider value={{ state, dispatch }}>
      {children}
    </CropperInfoContext.Provider>
  );
};

CropperInfoProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { CropperInfoContext, CropperInfoProvider };
