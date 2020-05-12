import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const AdjustContext = createContext();

const initialState = {
  brightness: 0,
  contrast: 0,
  gray: 0,
  blur: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RESET': {
      return initialState;
    }
    case 'SET_VALUE': {
      return { ...state, [action.key]: action.value };
    }
    default: {
      throw new Error(`unexpected action.type: ${action.type}`);
    }
  }
};

const AdjustProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AdjustContext.Provider value={[state, dispatch]}>{children}</AdjustContext.Provider>;
};

AdjustProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AdjustContext, AdjustProvider };
