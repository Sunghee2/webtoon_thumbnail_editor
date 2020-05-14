import React from 'react';
import '../../styles/TextAdd.scss';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import AddTextSetting from './AddTextSetting';

const AddText = ({ focusedTextID, textContents, dispatch }) => {
  const focusedTextAttribute = textContents.filter(item => item.id === focusedTextID)[0];
  return (
    <div className="add-text">
      <Button
        className="add-text-button"
        variant="contained"
        style={{ margin: `15px` }}
        onClick={() => dispatch({ type: 'ADD_TEXT_CONTENT' })}
      >
        + add text
      </Button>
      {focusedTextID !== '' && (
        <AddTextSetting textAttribute={focusedTextAttribute} dispatch={dispatch} />
      )}
    </div>
  );
};

export default AddText;

AddText.propTypes = {
  focusedTextID: PropTypes.string.isRequired,
  textContents: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};
