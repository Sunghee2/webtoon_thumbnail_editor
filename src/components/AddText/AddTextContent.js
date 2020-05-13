import React, { useRef } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import PropTypes from 'prop-types';

const AddTextContent = ({
  contentAttribute,
  handleTextPosition,
  handleFocusedID,
  removeTextContent,
  handleWidth,
}) => {
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
      handleTextPosition(id, { left: X, top: Y });
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
      handleWidth(id, X);
      document.removeEventListener('mousemove', handleMouseMove);
      document.onMouseup = null;
    });
  };

  if (!focused)
    return (
      <div
        className="add-text-content unselectable"
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
      </div>
    );

  return (
    <div
      className="add-text-content focused unselectable"
      ref={textContentRef}
      style={{ top, left, width, fontFamily: font }}
    >
      <div
        className="add-text-string unselectable"
        onMouseDown={handleTextMove}
        role="textbox"
        tabIndex="-1"
      >
        {text}
      </div>
      <CloseIcon className="remove-text-content" onClick={() => removeTextContent(id)} />
      <SwapHorizIcon className="resize-text-content" onMouseDown={handleTextResize} />
      {/* <AutorenewIcon className="rotate-text-content" /> */}
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
  }),
  handleTextPosition: PropTypes.func,
  handleFocusedID: PropTypes.func,
};

AddTextContent.defaultProps = {
  contentAttribute: {},
  handleTextPosition: () => {},
  handleFocusedID: () => {},
};
