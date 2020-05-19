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
  const { type, offsetTop, offsetLeft, width, height, nextCropper, changeY, rotateCount } = action;
  switch (type) {
    case 'init':
      return {
        ...state,
        left: offsetLeft,
        top: offsetTop,
        width,
        height: state.isWide ? (width * 9) / 16 : (width * 4) / 3,
        rotateCount: 0,
      };
    case 'rotate':
      return {
        ...state,
        rotateCount,
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
        top: changeY || state.top,
        height: (state.width * 4) / 3,
      };
    case 'se':
      return {
        ...state,
        width: nextCropper.width,
        height: state.isWide ? (nextCropper.width * 9) / 16 : (nextCropper.width * 4) / 3,
      };
    case 'ne':
      return {
        ...state,
        top: nextCropper.y,
        width: nextCropper.width,
        height: state.isWide ? (nextCropper.width * 9) / 16 : (nextCropper.width * 4) / 3,
      };
    case 'sw':
      return {
        ...state,
        left: nextCropper.x,
        width: nextCropper.width,
        height: state.isWide ? (nextCropper.width * 9) / 16 : (nextCropper.width * 4) / 3,
      };
    case 'nw':
      return {
        ...state,
        top: nextCropper.y,
        left: nextCropper.x,
        width: nextCropper.width,
        height: state.isWide ? (nextCropper.width * 9) / 16 : (nextCropper.width * 4) / 3,
      };
    case 'move':
      return {
        ...state,
        top: nextCropper.y,
        left: nextCropper.x,
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
