import React, { useEffect } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';

const BackButtonHandle = () => {
  let backPressedOnce = false;

  const backPressHandler = () => {
    if (backPressedOnce) {
      // If the back button is pressed again within 2 seconds, exit the app
      BackHandler.exitApp();
      return true;
    } else {
      // Show a toast message indicating to press again to exit
      ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
      backPressedOnce = true;
      setTimeout(() => {
        backPressedOnce = false;
      }, 2000); // Reset backPressedOnce after 2 seconds
      return true;
    }
  };

  useEffect(() => {
    // Add event listener for hardware back button press
    BackHandler.addEventListener('hardwareBackPress', backPressHandler);

    // Remove event listener on component unmount
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backPressHandler);
    };
  }, []);

  return null; // This component does not render anything
};

export default BackButtonHandle;