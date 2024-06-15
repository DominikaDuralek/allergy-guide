// src/components/QuaggaScanner.jsx
import React, { useEffect, useRef, useContext } from 'react';
import Quagga from 'quagga';
import { BarcodeContext } from '../context/BarcodeContext';

const QuaggaScanner = () => {
  const scannerRef = useRef(null);
  const { setBarcode } = useContext(BarcodeContext);

  useEffect(() => {
    Quagga.init({
      inputStream: {
        type: 'LiveStream',
        target: scannerRef.current,
        constraints: {
          facingMode: 'environment' // or use 'user' for front camera
        },
      },
      decoder: {
        readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'code_39_reader', 'code_39_vin_reader', 'codabar_reader', 'upc_reader', 'upc_e_reader', 'i2of5_reader']
      },
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected((data) => {
      console.log('Barcode detected and processed : [' + data.codeResult.code + ']', data);
      // Set the barcode data
      setBarcode(data.codeResult.code);
    });

    return () => {
      Quagga.stop();
    };
  }, [setBarcode]);

  return (
    <div className="scanner-container">
      <div className="scanner-view" ref={scannerRef} />
    </div>
  );
};

export default QuaggaScanner;