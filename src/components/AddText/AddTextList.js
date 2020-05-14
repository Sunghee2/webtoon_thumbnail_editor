import React from 'react';
import PropTypes from 'prop-types';
import AddTextContent from './AddTextContent';

const AddTextList = ({ focusedTextID, textContents, dispatch, handleFocusedID }) => {
  return (
    <div>
      {textContents.map(item => (
        <AddTextContent
          key={item.id}
          contentAttribute={{ ...item, focused: item.id === focusedTextID }}
          dispatch={dispatch}
          handleFocusedID={handleFocusedID}
        />
      ))}
    </div>
  );
};

export default AddTextList;
AddTextList.propTypes = {
  focusedTextID: PropTypes.string.isRequired,
  textContents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleFocusedID: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};
