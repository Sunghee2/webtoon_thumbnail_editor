/* eslint-disable consistent-return */
import React, { useContext } from 'react';
import { TextField, FormControl, InputLabel, Select, Typography } from '@material-ui/core';
import '../../styles/TextAdd.scss';
import PropTypes from 'prop-types';
import { AddTextContext } from '../../context';
import AddTextSlider from './AddTextSlider';

const AddTextSetting = ({ textAttribute }) => {
  const { textContentsDispatch } = useContext(AddTextContext);
  const { id, text, font, fontSize } = textAttribute;

  if (id !== undefined)
    return (
      <div className="add-text-setting">
        <TextField
          className="naver-colored"
          id="outlined-multiline-static"
          label="Text"
          multiline
          rows={4}
          variant="outlined"
          value={text}
          style={{ marginBottom: `20px` }}
          onChange={e =>
            textContentsDispatch({ type: 'CHANGE_TEXT_STRING', id, text: e.target.value })
          }
        />

        <FormControl
          className="naver-colored"
          variant="outlined"
          style={{ width: `100%`, marginBottom: `20px` }}
        >
          <InputLabel htmlFor="outlined-age-native-simple">Font</InputLabel>
          <Select
            className="add-text-font"
            native
            label="Font"
            value={font}
            onChange={e => textContentsDispatch({ type: 'CHANGE_FONT', id, font: e.target.value })}
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

        <Typography>Font size</Typography>
        <AddTextSlider fontSize={fontSize} id={id} />
      </div>
    );
};

export default AddTextSetting;

AddTextSetting.propTypes = {
  textAttribute: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    font: PropTypes.string.isRequired,
  }).isRequired,
};
