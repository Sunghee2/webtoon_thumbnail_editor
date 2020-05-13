import React from 'react';
import '../../styles/TextAdd.scss';
import Button from '@material-ui/core/Button';
import AddTextSetting from './AddTextSetting';

const AddText = ({ focusedTextID, addTextContent }) => {
  return (
    <div className="add-text">
      <div className="add-text-title">Text</div>
      <Button
        className="add-text-button"
        variant="contained"
        style={{ margin: `15px` }}
        onClick={addTextContent}
      >
        + add text
      </Button>
      {focusedTextID && <AddTextSetting />}
    </div>
  );
};

export default AddText;
