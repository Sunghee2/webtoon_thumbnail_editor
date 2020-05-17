import React, { useContext, useEffect } from 'react';
import '../../styles/TextAdd.scss';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import AddTextSetting from './AddTextSetting';
import { AddTextContext } from '../../context';

const AddText = ({ focusedTextID, canvasScale, setFocusedTextID }) => {
  const { textContents, textContentsDispatch } = useContext(AddTextContext);
  const focusedTextAttribute = textContents.filter(item => item.id === focusedTextID)[0];

  useEffect(() => {
    if (textContents.length <= 0) return;
    setFocusedTextID(textContents[textContents.length - 1].id);
  }, [textContents.length]);

  const handleAddTextClick = () => textContentsDispatch({ type: 'ADD_TEXT_CONTENT', canvasScale });

  return (
    <div className="add-text">
      <Button
        className="add-text-button"
        variant="contained"
        style={{ margin: `15px` }}
        onClick={handleAddTextClick}
      >
        + add text
      </Button>
      {focusedTextID !== '' && focusedTextAttribute && (
        <AddTextSetting textAttribute={focusedTextAttribute} />
      )}
    </div>
  );
};

export default AddText;

AddText.propTypes = {
  focusedTextID: PropTypes.string.isRequired,
  canvasScale: PropTypes.shape({}).isRequired,
  setFocusedTextID: PropTypes.func.isRequired,
};
