import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Slider } from '@material-ui/core';

const AdjustItem = ({ header, value }) => {
  return (
    <>
      <Typography gutterBottom>{header}</Typography>
      <Slider
        value={value}
        // onChange={handleChange}
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
};

export default AdjustItem;
