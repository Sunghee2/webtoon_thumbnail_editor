import React from 'react';

import AdjustItem from './AdjustItem';

const AdjustList = () => {
  const list = [
    { header: '밝기', value: 30 },
    { header: '대조', value: 80 },
    { header: '흑백', value: 0 },
    { header: '블러', value: 0 },
  ];

  return (
    <>
      {list.map(l => (
        <AdjustItem key={l.header} header={l.header} value={l.value} />
      ))}
    </>
  );
};

export default AdjustList;
