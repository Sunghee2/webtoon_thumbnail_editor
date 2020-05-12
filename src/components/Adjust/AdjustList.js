import React, { useReducer, useCallback } from 'react';

import AdjustItem from './AdjustItem';

const initialAdjustState = {
  brightness: 0,
  contrast: 0,
  gray: 0,
  blur: 0,
};

const adjustReducer = (state, action) => {
  switch (action.type) {
    case 'RESET': {
      return initialAdjustState;
    }
    case 'SET_VALUE': {
      return { ...state, [action.key]: action.value };
    }
    default: {
      throw new Error(`unexpected action.type: ${action.type}`);
    }
  }
};

const AdjustList = () => {
  const [adjust, dispatchAdjust] = useReducer(adjustReducer, initialAdjustState);

  const changeValue = useCallback((key, value) => {
    dispatchAdjust({ type: 'SET_VALUE', key, value });
  }, []);

  return (
    <>
      {Object.entries(adjust).map(([key, value]) => (
        <AdjustItem key={key} header={key} value={value} setValue={changeValue} />
      ))}
    </>
  );
};

export default AdjustList;
