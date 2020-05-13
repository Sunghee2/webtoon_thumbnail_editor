import React from 'react';
import '../../styles/TextAdd.scss';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import AddTextSetting from './AddTextSetting';

const AddText = ({
  focusedTextID,
  addTextContent,
  textContents,
  handleTextString,
  handleTextFont,
}) => {
  const focusedTextAttribute = textContents.filter(item => item.id === focusedTextID)[0];
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
      {focusedTextID !== '' && (
        <AddTextSetting
          textAttribute={focusedTextAttribute}
          handleTextString={handleTextString}
          handleTextFont={handleTextFont}
        />
      )}
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
