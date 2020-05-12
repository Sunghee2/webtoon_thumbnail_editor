import React, { useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import AdjustItem from './AdjustItem';
import { AdjustContext } from '../../context/adjustContext';
import { brightnessFilter, grayscaleFilter } from '../../utils/filter';

const AdjustList = ({ canvasRef }) => {
  const [adjust, dispatch] = useContext(AdjustContext);

  useEffect(() => {
    const canvas = canvasRef.current.getContext('2d');
    let imgData = canvas.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    Object.entries(adjust).forEach(([key, value]) => {
      switch (key) {
        case 'brightness':
          imgData = brightnessFilter(imgData, value);
          break;
        case 'contrast':
          break;
        case 'gray':
          imgData = grayscaleFilter(imgData, 0.01);
          break;
        case 'blur':
          break;
        default:
          break;
      }
    });
    canvas.putImageData(imgData, 0, 0);
  }, [adjust]);

  const setValue = useCallback((key, value) => {
    dispatch({ type: 'SET_VALUE', key, value });
  }, []);

  return (
    <>
      {Object.entries(adjust).map(([key, value]) => (
        <AdjustItem key={key} header={key} value={value} setValue={setValue} />
      ))}
    </>
  );
};

AdjustList.propTypes = {
  canvasRef: PropTypes.object.isRequired,
};

export default AdjustList;
