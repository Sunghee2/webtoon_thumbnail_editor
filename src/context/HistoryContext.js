import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import firebaseConfig from '../components/FirebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        thumbnails: action.data,
      };
    default:
      return {
        thumbnails: {},
      };
  }
};

const HistoryContext = createContext({ thumbnails: {} });

const HistoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { thumbnails: {} });

  return <HistoryContext.Provider value={{ state, dispatch }}>{children}</HistoryContext.Provider>;
};

HistoryContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { HistoryContext, HistoryContextProvider };
