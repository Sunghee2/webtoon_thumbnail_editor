import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const reducer = (state, action) => {
  const {
    canvasScale,
    setFocusedTextID,
    focusedTextID,
    id,
    top,
    left,
    width,
    text,
    font,
    fontSize,
  } = action;
  switch (action.type) {
    case 'ADD_TEXT_CONTENT': {
      const newID = `text_${new Date().getTime()}`;
      const newContent = {
        id: newID,
        width: 200,
        top: canvasScale.height / 2,
        left: canvasScale.width / 2 - 100,
        text: `글자를 입력하세요.`,
        font: `BlackHanSans`,
        fontSize: 30,
      };
      setFocusedTextID(newID);
      return [...state, newContent];
    }
    case 'CHANGE_TEXT_POSITION':
      return state.map(item => (item.id === id ? { ...item, top, left } : item));
    case 'CHANGE_WIDTH':
      return state.map(item => (item.id === id ? { ...item, width } : item));
    case 'CHANGE_TEXT_STRING':
      return state.map(item => (item.id === id ? { ...item, text } : item));
    case 'CHANGE_FONT':
      return state.map(item => (item.id === id ? { ...item, font } : item));
    case 'REMOVE_TEXT_CONTENT':
      if (focusedTextID === id) setFocusedTextID('');
      return state.filter(item => item.id !== id);
    case 'CHANGE_FONT_SIZE':
      return state.map(item => (item.id === id ? { ...item, fontSize } : item));
    case 'EMPTY_TEXT_CONTENTS':
      return [];
    default:
      return state;
  }
};

const AddTextContext = createContext([]);
const AddTextProvider = ({ children }) => {
  const [textContents, textContentsDispatch] = useReducer(reducer, []);
  return (
    <AddTextContext.Provider value={{ textContents, textContentsDispatch }}>
      {children}
    </AddTextContext.Provider>
  );
};

export { AddTextContext, AddTextProvider };

AddTextProvider.propTypes = {
  children: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
};
