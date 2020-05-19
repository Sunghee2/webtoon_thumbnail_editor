import React, { useContext } from 'react';
import { Slider, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import { AddTextContext } from '../../context';

function ValueLabelComponent({ children, open, value }) {
  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const AddTextSlider = ({ id, fontSize }) => {
  const { textContentsDispatch } = useContext(AddTextContext);
  const handleChange = (_, value) => {
    textContentsDispatch({ type: 'CHANGE_FONT_SIZE', id, fontSize: value });
  };
  return (
    <Slider
      className="naver-colored-slider"
      ValueLabelComponent={ValueLabelComponent}
      aria-label="custom thumb label"
      value={fontSize}
      onChange={handleChange}
      min={1}
      max={50}
    />
  );
};

export default AddTextSlider;

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

AddTextSlider.propTypes = {
  id: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
};
