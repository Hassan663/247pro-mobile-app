import { useEffect, useState } from 'react';
import { Platform, PermissionsAndroid, Alert, Linking } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [areaDetails, setAreaDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const requestAndroidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const requestIOSPermission = async () => {
    const authorization = await Geolocation.requestAuthorization('whenInUse');
    if (authorization === 'denied') {
      Alert.alert(
        'Location Permission Denied',
        'Please enable location services in your device settings to allow location access.',
        [
          {
            text: 'Go to Settings',
            onPress: () => Linking.openURL('app-settings:')
          }
        ]
      );
      return false;
    }
    return authorization === 'granted' || authorization === 'whenInUse';
  };

  const getAreaDetails = async (latitude, longitude) => {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`);
        const data = await response.json();
        const address = data.address;

        // Filter out any empty values and join the non-empty parts with a comma
        const formattedAddress = [
            address.road,
            address.neighbourhood,
            address.suburb,
            address.city,
            address.state,
            address.postcode,
            address.country
        ].filter(part => part && part.trim()).join(', ');

        console.log("Cleaned Address:", formattedAddress);
        setAreaDetails(formattedAddress);

        return formattedAddress;
    } catch (error) {
        console.error('Error fetching address:', error);
        setError('Error fetching address details.');
        throw error;
    }
};

  const fetchLocation = async () => {
    setLoading(true);
    try {
      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          async position => {
            const { latitude, longitude } = position.coords;
            const fetchedLocation = { latitude, longitude };

            try {
              const area = await getAreaDetails(latitude, longitude);
              setLocation(fetchedLocation);
              resolve({ location: fetchedLocation, areaDetails: area });
            } catch (areaError) {
              setError('Error fetching area details.');
              reject(areaError);
            }
          },
          err => {
            setError(err.message);
            Alert.alert('Location Error', 'Unable to fetch location. Please enable location services.');
            reject(err);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      });
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionLoop = async () => {
    let hasPermission = false;

    if (Platform.OS === 'android') {
      hasPermission = await requestAndroidPermission();
    } else if (Platform.OS === 'ios') {
      hasPermission = await requestIOSPermission();
    }

    if (hasPermission) {
      await fetchLocation();
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlePermissionLoop();
  }, []);

  return { location, areaDetails, error, loading, fetchLocation };
};