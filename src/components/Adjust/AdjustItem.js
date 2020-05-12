import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Slider } from '@material-ui/core';

const AdjustItem = ({ header, value, setValue }) => {
  const handleChange = (_, newValue) => {
    setValue(header, newValue);
  };

  return (
    <>
      <Typography gutterBottom>{header}</Typography>
      <Slider
        value={value}
        onChange={handleChange}
        aria-labelledby="continuous-slider"
        min={0}
        max={100}
        step={1}
        valueLabelDisplay="auto"
      />
    </>
  );
};

AdjustItem.propTypes = {
  header: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default AdjustItem;
