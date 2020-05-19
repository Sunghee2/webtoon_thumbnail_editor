import React, { useContext } from 'react';
import { Slider } from '@material-ui/core';
import PropTypes from 'prop-types';
import { AddTextContext } from '../../context';

const AddTextSlider = ({ id, fontSize }) => {
  const { textContentsDispatch } = useContext(AddTextContext);
  const handleChange = (_, value) => {
    textContentsDispatch({ type: 'CHANGE_FONT_SIZE', id, fontSize: value });
  };
  return (
    <Slider
      className="naver-colored-slider"
      aria-label="custom thumb label"
      valueLabelDisplay="auto"
      value={fontSize}
      onChange={handleChange}
      min={1}
      max={50}
    />
  );
};

export default AddTextSlider;

AddTextSlider.propTypes = {
  id: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
};
