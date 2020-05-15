import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AddTextContext } from '../../context';
import AddTextContent from './AddTextContent';

const AddTextList = ({ focusedTextID, setFocusedTextID, canvasScale }) => {
  const { textContents } = useContext(AddTextContext);
  return (
    <div>
      {textContents.map(item => (
        <AddTextContent
          key={item.id}
          contentAttribute={{ ...item, focused: item.id === focusedTextID }}
          setFocusedTextID={setFocusedTextID}
          focusedTextID={focusedTextID}
          canvasScale={canvasScale}
        />
      ))}
    </div>
  );
};

export default AddTextList;
AddTextList.propTypes = {
  focusedTextID: PropTypes.string.isRequired,
  setFocusedTextID: PropTypes.func.isRequired,
  canvasScale: PropTypes.shape({}).isRequired,
};
