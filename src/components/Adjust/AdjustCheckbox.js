import React, { memo } from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';

const AdjustCheckbox = memo(({ header, value, setValue }) => {
  const handleChange = (_, newValue) => {
    setValue(header, newValue);
  };

  return (
    <FormControlLabel
      control={<Checkbox checked={value} onChange={handleChange} name={header} color="primary" />}
      label={header}
    />
  );
});

AdjustCheckbox.propTypes = {
  header: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default AdjustCheckbox;
