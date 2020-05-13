import React, { useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { defaultAdjust } from '../../utils/const';
import AdjustItem from './AdjustItem';
import { AdjustContext } from '../../context/adjustContext';
import { brightnessFilter, grayscaleFilter, contrastFilter } from '../../utils/filter';
import AdjustCheckbox from './AdjustCheckbox';

const AdjustList = ({ canvasRef, image }) => {
  const [adjust, dispatch] = useContext(AdjustContext);

  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current.getContext('2d');
      const { width, height } = canvasRef.current;
      canvas.drawImage(image, 0, 0, width, height);
      let imgData = canvas.getImageData(0, 0, width, height);
      Object.entries(adjust).forEach(([key, value]) => {
        if (value !== defaultAdjust[key].default) {
          switch (key) {
            case 'brightness':
              imgData = brightnessFilter(imgData, value);
              break;
            case 'contrast':
              imgData = contrastFilter(imgData, value);
              break;
            case 'gray':
              imgData = grayscaleFilter(imgData);
              break;
            case 'blur':
              break;
            default:
              break;
          }
        }
      });
      canvas.putImageData(imgData, 0, 0);
    }
  }, [adjust]);

  const setValue = useCallback((key, value) => {
    dispatch({ type: 'SET_VALUE', key, value });
  }, []);

  return (
    <>
      {Object.entries(defaultAdjust).map(([key, value]) => {
        if (value.type === 'slider') {
          return (
            <AdjustItem
              key={key}
              header={key}
              value={adjust[key]}
              step={value.step}
              min={value.min}
              max={value.max}
              setValue={setValue}
            />
          );
        }
        if (value.type === 'checkbox') {
          return <AdjustCheckbox header={key} value={adjust[key]} setValue={setValue} />;
        }
        return <></>;
      })}
    </>
  );
};

AdjustList.propTypes = {
  canvasRef: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
};

export default AdjustList;
