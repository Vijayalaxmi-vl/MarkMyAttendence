import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoadingIndicator = () => {              //UI of loading indicating page
  const navigation = useNavigation();
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {                        // Displaying loading indicator for 3 seconds 
    const timeout = setTimeout(() => {
      setIsLoadingComplete(true);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {                          //  After Displaying loading indicator for 3 seconds navigate to Home page
    if (isLoadingComplete) {
      navigation.navigate('Mark My Attendence');
    }
  }, [isLoadingComplete, navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator animating={!isLoadingComplete} size={100} color={'black'} />
    </View>
  );
};

export default LoadingIndicator;
