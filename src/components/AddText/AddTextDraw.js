import React, { useRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AddTextContext } from '../../context/AddTextContext';

const AddTextDraw = ({ canvasScale, setFocusedTextID, mergingCanvas, setTextCanvasSaving }) => {
  const textCanvasRef = useRef(null);
  const { textContents } = useContext(AddTextContext);
  const drawText = () => {
    const textCanvas = textCanvasRef.current;
    const context = textCanvas.getContext('2d');
    const padding = 10;
    textContents.forEach(item => {
      const { width, font, text, fontSize } = item;
      let { top, left } = item;
      context.textBaseline = 'top';
      context.textAlign = 'center';
      context.font = `${fontSize}px ${font}`;
      context.strokeStyle = 'white';
      context.lineWidth = 2;

      const textSplits = text.split(' ');
      const maxWidth = width - padding * 2;
      let line = '';
      left += width / 2 + 5;
      top += 15;

      for (let i = 0; i < textSplits.length; i += 1) {
        let test = textSplits[i];
        let metrics = context.measureText(test);
        while (metrics.width > maxWidth) {
          test = test.substring(0, test.length - 1);
          metrics = context.measureText(test);
        }
        if (textSplits[i] !== test) {
          textSplits.splice(i + 1, 0, textSplits[i].substr(test.length));
          textSplits[i] = test;
        }

        test = `${line + textSplits[i]} `;
        metrics = context.measureText(test);

        if (metrics.width > maxWidth && i > 0) {
          context.strokeText(line, left, top);
          context.fillText(line, left, top);
          line = `${textSplits[i]} `;
          top += fontSize;
        } else {
          line = test;
        }
      }
      context.strokeText(line, left, top);
      context.fillText(line, left, top);
    });
    mergingCanvas(textCanvas);
    setFocusedTextID('');
    setTextCanvasSaving(false);
  };
  useEffect(() => {
    if (textCanvasRef) drawText();
  }, []);

  return (
    <canvas
      ref={textCanvasRef}
      className="add-text-canvas"
      width={canvasScale.width}
      height={canvasScale.height}
    >
      Not supported by this device.
    </canvas>
  );
};

export default AddTextDraw;

AddTextDraw.propTypes = {
  canvasScale: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  setFocusedTextID: PropTypes.func.isRequired,
  mergingCanvas: PropTypes.func.isRequired,
  setTextCanvasSaving: PropTypes.func.isRequired,
};
