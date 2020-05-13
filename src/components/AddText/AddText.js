import React from 'react';
import '../../styles/TextAdd.scss';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import AddTextSetting from './AddTextSetting';

const AddText = ({ focusedTextID, addTextContent }) => {
  return (
    <div className="add-text">
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

AddText.propTypes = {
  focusedTextID: PropTypes.string.isRequired,
  addTextContent: PropTypes.func,
};

AddText.defaultProps = {
  addTextContent: () => {},
};
