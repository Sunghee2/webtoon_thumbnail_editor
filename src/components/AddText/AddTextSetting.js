import React from 'react';
import { TextField, FormControl, InputLabel, Select } from '@material-ui/core';
import '../../styles/TextAdd.scss';

const AddTextSetting = ({ textAttribute, handleTextString, handleTextFont }) => {
  const { id, text, font } = textAttribute;
  return (
    <div className="add-text-setting">
      <TextField
        id="outlined-multiline-static"
        label="Text"
        multiline
        rows={4}
        variant="outlined"
        value={text}
        onChange={e => handleTextString(id, e.target.value)}
      />

      <FormControl variant="outlined" style={{ width: `100%` }}>
        <InputLabel htmlFor="outlined-age-native-simple">Font</InputLabel>
        <Select
          className="add-text-font"
          native
          label="Font"
          value={font}
          onChange={e => handleTextFont(id, e.target.value)}
        >
          <option value="BlackHanSans" style={{ fontFamily: 'BlackHanSans' }}>
            BlackHanSans
          </option>
          <option value="NanumSquareR" style={{ fontFamily: 'NanumSquareR' }}>
            NamumSquareR
          </option>
          <option value="NanumSqaureRoundR" style={{ fontFamily: 'NanumSqaureRoundR' }}>
            NanumSquareRound
          </option>
        </Select>
      </FormControl>
    </div>
  );
};

export default AddTextSetting;
