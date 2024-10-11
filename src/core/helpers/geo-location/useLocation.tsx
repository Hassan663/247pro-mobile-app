import { useEffect, useState } from 'react';
import { Platform, PermissionsAndroid, Alert, Linking } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [areaDetails, setAreaDetails] = useState(null); // To store the formatted address
  const [error, setError] = useState(null);

  // Request location permission for Android
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
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // Request location permission for iOS
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
          },
          // { text: 'Cancel', style: 'cancel' }
        ],
      );
      return false;
    }
    return authorization === 'granted' || authorization === 'whenInUse';
  };

  // Function to reverse geocode the location using Nominatim
  const getAreaDetails = (latitude, longitude) => {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`)
      .then(response => response.json())
      .then(data => {
        const address = data.address;

        // Create a formatted address string
        const formattedAddress = `${address.road || ''}, ${address.neighbourhood || ''}, ${address.suburb || ''}, ${address.city || ''}, ${address.state || ''}, ${address.postcode || ''}, ${address.country || ''}`;
        
        // Remove extra commas and spaces
        const cleanedAddress = formattedAddress.replace(/,+/g, ',').replace(/, $/, '').trim();
        
        console.log("Formatted Address:", cleanedAddress); // You will get the complete address here
        
        // Set the formatted address in areaDetails
        setAreaDetails(cleanedAddress);
      })
      .catch(error => {
        console.error('Error fetching address:', error);
        setError('Error fetching address details.');
      });
  };

  // Function to get the current location (returns a Promise)
  const fetchLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude, "Longitude:", longitude); // Log the lat and long
          setLocation({ latitude, longitude });

          // Get the area details after fetching the location
          getAreaDetails(latitude, longitude);

          resolve({ latitude, longitude });  // Resolve the promise with lat and long
        },
        err => {
          setError(err.message);
          Alert.alert('Location Error', 'Unable to fetch location. Please enable location services.');
          reject(err);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    });
  };

  // Function to handle permission loop
  const handlePermissionLoop = async () => {
    let hasPermission = false;

    if (Platform.OS === 'android') {
      hasPermission = await requestAndroidPermission();
    } else if (Platform.OS === 'ios') {
      hasPermission = await requestIOSPermission();
    }

    if (!hasPermission) {
      // Alert.alert(
      //   'Location Permission Required',
      //   'This app needs access to your location to function properly. Please allow access.',
      //   [
      //     {
      //       text: 'OK',
      //       onPress: async () => {
      //         const granted = Platform.OS === 'android'
      //           ? await requestAndroidPermission() // Re-request on Android
      //           : await requestIOSPermission();     // Re-request on iOS
              
      //         if (granted) {
      //           fetchLocation(); // Fetch location if permission is granted
      //         } else {
      //           handlePermissionLoop(); // If permission is denied again, keep prompting
      //         }
      //       },
      //     },
      //   ],
      //   { cancelable: false }
      // );
    } else {
      fetchLocation(); // If permission is granted initially, fetch the location
    }
  };

  // Hook to request permission and fetch location on mount
  useEffect(() => {
    handlePermissionLoop(); // Initiate the permission loop
  }, []);

  return { location, areaDetails, error, fetchLocation };
};