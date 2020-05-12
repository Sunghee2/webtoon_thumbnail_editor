import React, { useCallback, useContext } from 'react';

import AdjustItem from './AdjustItem';
import { AdjustContext } from '../../context/adjustContext';

const AdjustList = () => {
  const [state, dispatch] = useContext(AdjustContext);

  const setValue = useCallback((key, value) => {
    dispatch({ type: 'SET_VALUE', key, value });
  }, []);

  return (
    <>
      {Object.entries(state).map(([key, value]) => (
        <AdjustItem key={key} header={key} value={value} setValue={setValue} />
      ))}
    </>
  );
};

export default AdjustList;
