import React, { useRef } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import PropTypes from 'prop-types';

const AddTextContent = ({ contentAttribute, handleTextPosition, handleFocusedID }) => {
  const { id, top, left, text, font, focused } = contentAttribute;
  const textContentRef = useRef(null);

  const handleMouseDown = () => {
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

  if (!focused)
    return (
      <div
        className="add-text-content"
        ref={textContentRef}
        style={{ top, left, fontFamily: font }}
        onMouseMove={() => handleFocusedID(id)}
      >
        {text}
      </div>
    );

  return (
    <div
      role="textbox"
      tabIndex="-1"
      className="add-text-content focused"
      ref={textContentRef}
      style={{ top, left, fontFamily: font }}
      onMouseDown={handleMouseDown}
    >
      <div onDragStart={e => e.preventDefault()}>{text}</div>
      <CloseIcon className="remove-text-content" />
      <AutorenewIcon className="rotate-text-content" />
    </div>
  );
};

export default AddTextContent;
AddTextContent.propTypes = {
  contentAttribute: PropTypes.shape({
    id: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
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
