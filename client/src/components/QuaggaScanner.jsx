import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import Quagga from 'quagga';
import { useContext } from 'react';
import { BarcodeContext } from '../context/BarcodeContext';

const QuaggaScanner = forwardRef((props, ref) => {
  const scannerRef = useRef(null);
  const { setBarcode } = useContext(BarcodeContext);

  const [isQuaggaInitialized, setIsQuaggaInitialized] = useState(false);
  const [videoDevices, setVideoDevices] = useState([]);

  useEffect(() => {
    // Get the list of video devices
    Quagga.CameraAccess.enumerateVideoDevices().then((devices) => {
      console.log(devices);
      setVideoDevices(devices);
    });
  }, []);

  // Android
  const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
  };

  // iPhone
  const isIOSDevice = () => {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  const getPreferredCameraId = () => {
    if (videoDevices.length === 0) return null;

    // iPhone
    if (isIOSDevice()) {      
      // Use the rear camera if available
      const rearCamera = videoDevices.find(device => device.label.toLowerCase().includes('back'));
      if (rearCamera) {
        return rearCamera.deviceId;
      }
    } else if (isMobileDevice()) {
      // Use the last camera on mobile
      return videoDevices[videoDevices.length - 1].deviceId;
    } else {
      // Use the first camera on PC
      return videoDevices[0].deviceId;
    }
  };

  useImperativeHandle(ref, () => ({
    startScanner: () => {
      const cameraId = getPreferredCameraId();
      const constraints = {
        facingMode: 'environment',
        focusMode: 'continuous',
        ...(cameraId && { deviceId: cameraId }),
        width: { ideal: 1366 },
        height: { ideal: 768 }, 
      };

      Quagga.init({        
        inputStream: {
          type: 'LiveStream',
          target: scannerRef.current,
          constraints,
        },
        decoder: {
          readers: [
            'code_128_reader',
            'ean_reader',
            'ean_8_reader',
            'code_39_reader',
            'code_39_vin_reader',
            'codabar_reader',
            'upc_reader',
            'upc_e_reader',
            'i2of5_reader',
          ],
        },
      }, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
        setIsQuaggaInitialized(true);
      });

      Quagga.onDetected((data) => {
        // Set the barcode data
        setBarcode(data.codeResult.code);
      });
    },

    stopScanner: () => {
      Quagga.stop();
      setIsQuaggaInitialized(false);
    },
  }));

  // Close the scanner when the subpage gets changed
  useEffect(() => {
    return () => {
        if (isQuaggaInitialized) {
            Quagga.stop();
        }
    };
  }, [isQuaggaInitialized]);

  return (
    <div className="scanner-container">
      <div className="scanner-view" ref={scannerRef} />
    </div>
  );
});

export default QuaggaScanner;