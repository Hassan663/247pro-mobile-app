import { useEffect, useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  // Request location permission for Android
  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        setError(err.message);
        return false;
      }
    }
    return true; // iOS permissions handled automatically in plist
  };

  // Function to get the current location
  const fetchLocation = () => {
   
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        console.log("THE LAT AND LONG IS ", latitude,longitude)
      },
      
      err => setError(err.message),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  // Hook to request permission and fetch location on mount
  useEffect(() => {
    (async () => {
      const hasPermission = await requestPermission();
      if (hasPermission) {
        fetchLocation();
      }
    })();
  }, []);

  return { location, error, fetchLocation };
};