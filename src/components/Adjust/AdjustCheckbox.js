import React, { memo } from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';

const AdjustCheckbox = memo(({ header, value, setValue }) => {
  const handleChange = (_, newValue) => {
    setValue(header, newValue);
  };

  return (
    <FormControlLabel
      control={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <Checkbox
          className="naver-colored-checkbox"
          checked={value}
          onChange={handleChange}
          name={header}
        />
      }
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
