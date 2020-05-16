import React from 'react';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PropTypes from 'prop-types';

const Thumbnail = props => {
  const { name, src } = props;

  const copyImageUrl = () => {
    // alert(`클립보드에 복사되었습니다 :)`);
  };

  return (
    <li>
      <img src={src} alt={name} />
      <button type="button" onClick={() => copyImageUrl(src)}>
        <FileCopyIcon />
        {name}
      </button>
    </li>
  );
};

Thumbnail.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default Thumbnail;
