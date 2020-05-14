import React from 'react';
import PropTypes from 'prop-types';

const AddTextString = ({
  textContentRef,
  contentAttribute,
  dispatch,
  handleFocusedID,
  canvasScale,
}) => {
  const { id, top, left, text } = contentAttribute;
  const { width, height } = canvasScale;
  const handleTextMove = () => {
    const textContent = textContentRef.current;
    let X = left;
    let Y = top;

    const nextX = dX => {
      const nX = X + dX;
      const endX = width - textContent.offsetWidth;
      if (nX < 0) return 0;
      if (nX > endX) return endX;
      return nX;
    };

    const nextY = dY => {
      const nY = Y + dY;
      const endY = height - textContent.offsetHeight;
      if (nY < 0) return 0;
      if (nY > endY) return endY;
      return nY;
    };

    const move = (dX, dY) => {
      X = nextX(dX);
      Y = nextY(dY);
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

  return (
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
  );
};

export default AddTextString;
AddTextString.propTypes = {
  contentAttribute: PropTypes.shape({
    id: PropTypes.string.isRequired,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  textContentRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  handleFocusedID: PropTypes.func.isRequired,
  canvasScale: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
};
