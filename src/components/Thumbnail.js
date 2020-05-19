import React from 'react';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Thumbnail = ({ name, src }) => {
  const copyImageUrl = () => {
    // eslint-disable-next-line no-alert
    alert(`클립보드에 복사되었습니다 :)`);
  };

  return (
    <li>
      <img src={src} alt={name} />
      <CopyToClipboard text={src} onCopy={copyImageUrl}>
        <button type="button">
          <FileCopyIcon />
          {name}
        </button>
      </CopyToClipboard>
    </li>
  );
};

Thumbnail.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default Thumbnail;
