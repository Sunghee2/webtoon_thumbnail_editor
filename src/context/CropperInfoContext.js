import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  isWide: true,
};

const reducer = (state, action) => {
  const {
    type,
    offsetTop,
    offsetLeft,
    width,
    height,
    nextX,
    nextY,
    nextWidth,
    nextHeight,
    nextWidthReverse,
  } = action;

  switch (type) {
    case 'init':
      return {
        ...state,
        left: offsetLeft,
        top: offsetTop,
        width,
        height: state.isWide ? (width * 9) / 16 : (width * 4) / 3,
      };
    case 'wide':
      return {
        ...state,
        isWide: true,
        height: (state.width * 9) / 16,
      };
    case 'tall':
      return {
        ...state,
        isWide: false,
        height: (state.width * 4) / 3,
      };
    case 'se':
      return {
        ...state,
        width: nextWidth,
        height: state.isWide ? (nextWidth * 9) / 16 : (nextWidth * 4) / 3,
      };
    case 'ne':
      return {
        ...state,
        top: nextY,
        width: nextWidth,
        height: state.isWide ? (nextWidth * 9) / 16 : (nextWidth * 4) / 3,
      };
    case 'sw':
      return {
        ...state,
        left: nextX,
        width: nextWidthReverse,
        height: state.isWide ? (nextWidthReverse * 9) / 16 : (nextWidthReverse * 4) / 3,
      };
    case 'nw':
      return {
        ...state,
        top: nextY,
        left: nextX,
        width: nextWidthReverse,
        height: state.isWide ? (nextWidthReverse * 9) / 16 : (nextWidthReverse * 4) / 3,
      };
    case 'move':
      return {
        ...state,
        top: nextY,
        left: nextX,
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
