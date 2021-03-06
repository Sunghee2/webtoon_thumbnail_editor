import React, { useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import AdjustSlider from './AdjustSlider';
import AdjustCheckbox from './AdjustCheckbox';
import { defaultAdjust } from '../../utils/const';
import { AdjustContext } from '../../context';
import { brightnessFilter, grayscaleFilter, contrastFilter, blurFilter } from '../../utils/filter';

const AdjustList = ({ canvasRef, image }) => {
  const [adjust, dispatch] = useContext(AdjustContext);

  useEffect(() => {
    if (image) {
      const context = canvasRef.current.getContext('2d');
      const { width, height } = canvasRef.current;

      const backCanvas = new OffscreenCanvas(width, height);
      const backContext = backCanvas.getContext('2d');
      backContext.drawImage(image, 0, 0, width, height);
      let imgData = backContext.getImageData(0, 0, width, height);

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
              imgData = blurFilter(imgData, value, width * 4);
              break;
            default:
              break;
          }
        }
      });
      backContext.putImageData(imgData, 0, 0);
      const backImage = backCanvas.transferToImageBitmap();
      context.clearRect(0, 0, width, height);
      context.drawImage(backImage, 0, 0);
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
            <AdjustSlider
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
          return <AdjustCheckbox key={key} header={key} value={adjust[key]} setValue={setValue} />;
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
