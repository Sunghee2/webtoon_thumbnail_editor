import React, { useRef } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import PropTypes from 'prop-types';

const AddTextContent = ({ contentAttribute, dispatch, handleFocusedID }) => {
  const { id, top, left, width, text, font, focused } = contentAttribute;
  const textContentRef = useRef(null);

  const handleTextMove = () => {
    const textContent = textContentRef.current;
    let X = left;
    let Y = top;

    const move = (dX, dY) => {
      X += dX;
      Y += dY;
      textContent.style.left = `${X}px`;
      textContent.style.top = `${Y}px`;
    };

    const handleMouseMove = e => {
      move(e.movementX, e.movementY);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {
      dispatch({ type: 'CHANGE_TEXT_POSITION', id, left: X, top: Y });
      document.removeEventListener('mousemove', handleMouseMove);
      document.onMouseup = null;
    });
  };

  const handleTextResize = () => {
    const textContent = textContentRef.current;
    let X = width;

    const move = dX => {
      X += dX;
      textContent.style.width = `${X < 50 ? 50 : X}px`;
    };

    const handleMouseMove = e => {
      move(e.movementX);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', () => {
      dispatch({ type: 'CHANGE_WIDTH', id, width: X });
      document.removeEventListener('mousemove', handleMouseMove);
      document.onMouseup = null;
    });
  };

  return (
    <div
      className={`add-text-content unselectable${focused ? ` focused` : ``}`}
      ref={textContentRef}
      style={{ top, left, width, fontFamily: font }}
    >
      <div
        className="add-text-string unselectable"
        onMouseDown={() => {
          handleFocusedID(id);
          handleTextMove();
        }}
        role="textbox"
        tabIndex="-1"
      >
        {text}
      </div>
      <CloseIcon
        className={`remove-text-content${focused ? `` : ` hide`}`}
        onClick={() => dispatch({ type: 'REMOVE_TEXT_CONTENT', id })}
      />
      <SwapHorizIcon
        className={`resize-text-content${focused ? `` : ` hide`}`}
        onMouseDown={handleTextResize}
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
