import React, { useState } from 'react';
import '../../styles/TextAdd.scss';
import Button from '@material-ui/core/Button';
import AddTextSetting from './AddTextSetting';

const AddText = () => {
  const [addTextSettingActive, setAddTextSettingActive] = useState(false);
  return (
    <div className="add-text">
      <div className="add-text-title">Text</div>
      <Button
        className="add-text-button"
        variant="contained"
        style={{ margin: `15px` }}
        onClick={() => setAddTextSettingActive(true)}
      >
        + add text
      </Button>
      {addTextSettingActive && <AddTextSetting />}
    </div>
  );
};

export default AddText;
