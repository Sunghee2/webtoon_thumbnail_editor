import React, { createContext, useState } from 'react';

const CropperInfoContext = createContext([{}, () => {}]);
const CropperInfoProvider = ({ children }) => {
  const [cropperInfo, setCropperInfo] = useState({});
  return (
    <CropperInfoContext.Provider value={[cropperInfo, setCropperInfo]}>
      {children}
    </CropperInfoContext.Provider>
  );
};

export { CropperInfoContext, CropperInfoProvider };
