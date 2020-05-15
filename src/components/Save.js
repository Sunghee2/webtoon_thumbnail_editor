import React from 'react';
import { Button } from '@material-ui/core';
import propTypes from 'prop-types';

const Save = props => {
  const { canvasRef } = props;
  const handleClick = e => {
    e.preventDefault();

    console.log('c', canvasRef);

    if (canvasRef.current) {
      const canvasEl = canvasRef.current;
      const canvasData = canvasEl.toDataURL();
      const link = document.getElementById('link');

      link.setAttribute('download', 'download.png');
      link.setAttribute('href', canvasData.replace('image/png', 'image/octet-stream'));
      link.click();
    }
  };
  return (
    <>
      <Button className="open-btn" variant="contained" color="primary" onClick={handleClick}>
        저장
      </Button>
      <a id="link" href="default">
        {undefined}
      </a>
    </>
  );
};

Save.propTypes = {
  canvasRef: propTypes.oneOfType([propTypes.func, propTypes.shape({ current: propTypes.any })])
    .isRequired,
};

export default Save;
