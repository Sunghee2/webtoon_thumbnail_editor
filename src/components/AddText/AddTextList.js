import React from 'react';
import PropTypes from 'prop-types';
import AddTextContent from './AddTextContent';

const AddTextList = ({
  focusedTextID,
  textContents,
  handleTextPosition,
  handleFocusedID,
  removeTextContent,
}) => {
  return (
    <div>
      {textContents.map(item => (
        <AddTextContent
          key={item.id}
          contentAttribute={{ ...item, focused: item.id === focusedTextID }}
          handleTextPosition={handleTextPosition}
          handleFocusedID={handleFocusedID}
          removeTextContent={removeTextContent}
        />
      ))}
    </div>
  );
};

export default AddTextList;
AddTextList.propTypes = {
  focusedTextID: PropTypes.string,
  textContents: PropTypes.arrayOf(PropTypes.object),
  handleTextPosition: PropTypes.func,
  handleFocusedID: PropTypes.func,
};

AddTextList.defaultProps = {
  focusedTextID: '',
  textContents: [],
  handleTextPosition: () => {},
  handleFocusedID: () => {},
};
