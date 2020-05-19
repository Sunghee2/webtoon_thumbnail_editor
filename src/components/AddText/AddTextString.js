import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AddTextContext } from '../../context';

const AddTextString = ({
  textContentRef,
  contentAttribute,
  setFocusedTextID,
  canvasScale,
  textMode,
}) => {
  const { textContentsDispatch } = useContext(AddTextContext);
  const { id, top, left, text, font, fontSize } = contentAttribute;
  const { width, height } = canvasScale;
  const handleTextMove = () => {
    const textContent = textContentRef.current;
    let X = left;
    let Y = top;
    const padding = canvasScale.left;

    const nextX = dX => {
      const nX = X + dX;
      const endX = width - textContent.offsetWidth + padding;
      if (nX < padding) return padding;
      if (nX > endX) return endX;
      return nX;
    };

    const nextY = dY => {
      const nY = Y + dY;
      const endY = height - textContent.offsetHeight + padding;
      if (nY < padding) return padding;
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
      textContentsDispatch({ type: 'CHANGE_TEXT_POSITION', id, left: X, top: Y });
      document.removeEventListener('mousemove', handleMouseMove);
      document.onMouseup = null;
    });
  };

  return (
    <div
      className="add-text-string unselectable"
      onMouseDown={() => {
        if (!textMode) return;

        setFocusedTextID(id);
        handleTextMove();
      }}
      role="textbox"
      tabIndex="-1"
      style={{ fontFamily: font, fontSize }}
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
    font: PropTypes.string.isRequired,
    fontSize: PropTypes.number.isRequired,
  }).isRequired,
  textContentRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  setFocusedTextID: PropTypes.func.isRequired,
  canvasScale: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }).isRequired,
  textMode: PropTypes.bool.isRequired,
};
