import React, { useRef, useContext } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { AddTextContext } from '../../context';
import AddTextResizer from './AddTextResizer';
import AddTextString from './AddTextString';

const AddTextContent = ({
  contentAttribute,
  setFocusedTextID,
  canvasScale,
  focusedTextID,
  textMode,
}) => {
  const { textContentsDispatch } = useContext(AddTextContext);
  const { id, top, left, width, focused } = contentAttribute;
  const textContentRef = useRef(null);

  return (
    <div
      className={`add-text-content unselectable${focused ? ` focused` : ``}${
        textMode ? ` hover-allow` : ``
      }`}
      ref={textContentRef}
      style={{ top, left, width }}
    >
      <AddTextString
        contentAttribute={contentAttribute}
        setFocusedTextID={setFocusedTextID}
        textContentRef={textContentRef}
        canvasScale={canvasScale}
        textMode={textMode}
      />
      <CloseIcon
        className={`remove-text-content${focused ? `` : ` hide`}`}
        onClick={() => {
          textContentsDispatch({
            type: 'REMOVE_TEXT_CONTENT',
            id,
          });
          if (focusedTextID === id) setFocusedTextID('');
        }}
      />
      <AddTextResizer contentAttribute={contentAttribute} textContentRef={textContentRef} />
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
    fontSize: PropTypes.number.isRequired,
  }).isRequired,
  setFocusedTextID: PropTypes.func.isRequired,
  canvasScale: PropTypes.shape({}).isRequired,
  focusedTextID: PropTypes.string.isRequired,
  textMode: PropTypes.bool.isRequired,
};
