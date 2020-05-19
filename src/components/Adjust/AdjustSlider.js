import React, { memo } from 'react';
import { Typography, Slider } from '@material-ui/core';
import PropTypes from 'prop-types';

const AdjustSlider = memo(({ header, value, min, max, step, setValue }) => {
  const handleChange = (_, newValue) => {
    setValue(header, newValue);
  };

  return (
    <>
      <Typography gutterBottom>{header}</Typography>
      <Slider
        className="naver-colored-slider"
        value={value}
        onChange={handleChange}
        aria-labelledby="continuous-slider"
        min={min}
        max={max}
        step={step}
        valueLabelDisplay="auto"
      />
    </>
  );
});

AdjustSlider.propTypes = {
  header: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default AdjustSlider;
