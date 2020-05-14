import React, { useRef } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import AddTextResizer from './AddTextResizer';
import AddTextString from './AddTextString';

const AddTextContent = ({ contentAttribute, dispatch, handleFocusedID }) => {
  const { id, top, left, width, font, focused } = contentAttribute;
  const textContentRef = useRef(null);

  return (
    <div
      className={`add-text-content unselectable${focused ? ` focused` : ``}`}
      ref={textContentRef}
      style={{ top, left, width, fontFamily: font }}
    >
      <AddTextString
        contentAttribute={contentAttribute}
        dispatch={dispatch}
        handleFocusedID={handleFocusedID}
        textContentRef={textContentRef}
      />
      <CloseIcon
        className={`remove-text-content${focused ? `` : ` hide`}`}
        onClick={() => dispatch({ type: 'REMOVE_TEXT_CONTENT', id })}
      />
      <AddTextResizer
        contentAttribute={contentAttribute}
        dispatch={dispatch}
        textContentRef={textContentRef}
      />
    </div>
  );
};

export default AddTextContent;
AddTextContent.propTypes = {
  contentAttribute: PropTypes.shape({
    id: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    font: PropTypes.string.isRequired,
    focused: PropTypes.bool.isRequired,
  }).isRequired,
  handleFocusedID: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};
