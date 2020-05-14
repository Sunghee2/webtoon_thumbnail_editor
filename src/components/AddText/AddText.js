import React, { useContext } from 'react';
import '../../styles/TextAdd.scss';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import AddTextSetting from './AddTextSetting';
import { AddTextContext } from '../../context/AddTextContext';

const AddText = ({ focusedTextID, canvasScale, setFocusedTextID }) => {
  const { textContents, textContentsDispatch } = useContext(AddTextContext);
  const focusedTextAttribute = textContents.filter(item => item.id === focusedTextID)[0];

  return (
    <div className="add-text">
      <Button
        className="add-text-button"
        variant="contained"
        style={{ margin: `15px` }}
        onClick={() =>
          textContentsDispatch({ type: 'ADD_TEXT_CONTENT', canvasScale, setFocusedTextID })
        }
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
