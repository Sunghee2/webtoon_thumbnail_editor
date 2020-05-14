import React, { useRef, useContext } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { AddTextContext } from '../../context/AddTextContext';
import AddTextResizer from './AddTextResizer';
import AddTextString from './AddTextString';

const AddTextContent = ({ contentAttribute, setFocusedTextID, canvasScale }) => {
  const { textContentsDispatch } = useContext(AddTextContext);
  const { id, top, left, width, font, focused, fontSize } = contentAttribute;
  const textContentRef = useRef(null);

  return (
    <div
      className={`add-text-content unselectable${focused ? ` focused` : ``}`}
      ref={textContentRef}
      style={{ top, left, width }}
    >
      <AddTextString
        contentAttribute={contentAttribute}
        setFocusedTextID={setFocusedTextID}
        textContentRef={textContentRef}
        canvasScale={canvasScale}
      />
      <CloseIcon
        className={`remove-text-content${focused ? `` : ` hide`}`}
        onClick={() =>
          textContentsDispatch({
            type: 'REMOVE_TEXT_CONTENT',
            setFocusedTextID,
            id,
          })
        }
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
};
