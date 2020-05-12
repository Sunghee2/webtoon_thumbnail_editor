import React, { createContext, useReducer } from 'react';

const initialState = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
};
const reducer = (state, action) => {
  const { type, offsetTop, offsetLeft, width, height, cropperChange, diffX, diffY } = action;
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
        width: cropperChange.prevWidth - diffX,
        height: cropperChange.prevHeight - diffY,
      };
    case 'ne':
      return {
        ...state,
        top: cropperChange.prevY - diffY,
        width: cropperChange.prevWidth - diffX,
        height: cropperChange.prevHeight + diffY,
      };
    case 'sw':
      return {
        ...state,
        left: cropperChange.prevX - diffX,
        width: cropperChange.prevWidth + diffX,
        height: cropperChange.prevHeight - diffY,
      };
    case 'nw':
      return {
        top: cropperChange.prevY - diffY,
        left: cropperChange.prevX - diffX,
        width: cropperChange.prevWidth + diffX,
        height: cropperChange.prevHeight + diffY,
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

export { CropperInfoContext, CropperInfoProvider };
