import React, { createContext, useState } from 'react';

export const BarcodeContext = createContext();

export const BarcodeProvider = ({ children }) => {
  const [barcode, setBarcode] = useState(null);

  return (
    <BarcodeContext.Provider value={{ barcode, setBarcode }}>
      {children}
    </BarcodeContext.Provider>
  );
};