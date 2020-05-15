import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { AddTextContext } from '../../context/AddTextContext';

const AddTextResizer = ({ contentAttribute, textContentRef }) => {
  const { textContentsDispatch } = useContext(AddTextContext);
  const { id, width, focused } = contentAttribute;
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
      textContentsDispatch({ type: 'CHANGE_WIDTH', id, width: X });
      document.removeEventListener('mousemove', handleMouseMove);
      document.onMouseup = null;
    });
  };
  return (
    <SwapHorizIcon
      className={`resize-text-content${focused ? `` : ` hide`}`}
      onMouseDown={handleTextResize}
    />
  );
};

export default AddTextResizer;

AddTextResizer.propTypes = {
  contentAttribute: PropTypes.shape({
    id: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    focused: PropTypes.bool.isRequired,
  }).isRequired,
  textContentRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
};
